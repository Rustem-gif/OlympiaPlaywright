import { exec } from 'child_process';
import { promisify } from 'util';
import { setTimeout } from 'timers/promises';
import type { IVpnController } from './vpnControllerFactory';

const execAsync = promisify(exec);

// Path to ExpressVPN CLI
const EXPRESSVPN_CLI = '/Applications/ExpressVPN.app/Contents/MacOS/expressvpnctl';

export class VpnControllerMac implements IVpnController {
  constructor() {}

  private runVPN(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          reject(error.message);
          return;
        }
        // ExpressVPN CLI sometimes writes informational lines to stderr — treat as warnings only
        if (stderr) {
          console.warn(`VPN CLI warning: ${stderr}`);
        }
        console.log(`Output: ${stdout}`);
        resolve(stdout);
      });
    });
  }

  /**
   * Connect to a specific VPN location
   * @param location - VPN location (e.g., "Netherlands - Amsterdam")
   */
  async vpnConnect(location: string): Promise<void> {
    try {
      console.log(`Connecting to VPN location: ${location}`);
      await this.runVPN(`${EXPRESSVPN_CLI} connect "${location}"`);

      // Poll until the connection is fully established or timeout
      const connectTimeout = 30000;
      const pollInterval = 2000;
      const deadline = Date.now() + connectTimeout;
      while (Date.now() < deadline) {
        const status = await this.vpnCheckStatus();
        if (status.toLowerCase().includes('connected')) {
          console.log(`VPN connected successfully to ${location}`);
          return;
        }
        await setTimeout(pollInterval);
      }
      throw new Error(`VPN connection to "${location}" timed out after ${connectTimeout}ms`);
    } catch (error) {
      console.error(`Failed to connect VPN: ${error}`);
      throw error;
    }
  }

  /**
   * Disconnect from VPN
   */
  async vpnDisconnect(): Promise<void> {
    try {
      console.log('Disconnecting VPN...');
      await this.runVPN(`${EXPRESSVPN_CLI} disconnect`);
      console.log(`VPN disconnected`);
    } catch (error) {
      console.error(`Failed to disconnect VPN: ${error}`);
      // Don't throw error for disconnect failures as it's cleanup
    }
  }

  /**
   * Check VPN connection status
   * @returns Promise<string> - Connection status
   */
  async vpnCheckStatus(): Promise<string> {
    try {
      const status = await this.runVPN(`${EXPRESSVPN_CLI} status`);
      return status.trim();
    } catch (error) {
      console.error(`Failed to check VPN status: ${error}`);
      return 'error';
    }
  }

  /**
   * Get list of available VPN locations
   * @returns Promise<string[]> - Array of available locations
   */
  async vpnListLocations(): Promise<string[]> {
    try {
      const output = await this.runVPN(`${EXPRESSVPN_CLI} list`);
      const locations = output
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.trim());

      return locations;
    } catch (error) {
      console.error(`Failed to list VPN locations: ${error}`);
      return [];
    }
  }

  /**
   * Sleep/wait function for VPN operations
   * @param ms - Milliseconds to wait
   */
  /**
   * Get current IP address (useful for verifying VPN connection)
   * @returns Promise<string> - Current public IP address
   */
  async getCurrentIP(): Promise<string> {
    try {
      // Using a simple curl command to get IP
      const command = 'curl -s https://api.ipify.org';
      const { stdout, stderr } = await execAsync(command);

      if (stderr) {
        throw new Error(`Failed to get IP: ${stderr}`);
      }

      return stdout.trim();
    } catch (error) {
      console.error(`Failed to get current IP: ${error}`);
      return 'unknown';
    }
  }

  /**
   * Verify VPN connection by checking if IP changed
   * @param originalIP - IP address before VPN connection
   * @returns Promise<boolean> - True if IP changed (VPN working)
   */
  async verifyVPNConnection(originalIP: string): Promise<boolean> {
    try {
      const currentIP = await this.getCurrentIP();
      const isChanged = currentIP !== originalIP && currentIP !== 'unknown';

      console.log(`Original IP: ${originalIP}, Current IP: ${currentIP}, Changed: ${isChanged}`);
      return isChanged;
    } catch (error) {
      console.error(`Failed to verify VPN connection: ${error}`);
      return false;
    }
  }

  /**
   * Sleep/wait function for VPN operations
   * @param ms - Milliseconds to wait
   */
  async sleepVPN(ms: number): Promise<void> {
    await setTimeout(ms);
  }
}
