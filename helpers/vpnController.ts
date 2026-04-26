import { exec } from 'child_process';
import { promisify } from 'util';
import { setTimeout } from 'timers/promises';
import type { IVpnController } from './vpnControllerFactory';

const execAsync = promisify(exec);

export class VpnController implements IVpnController {
  private expressvpnPath = 'C:/Program Files (x86)/ExpressVPN/services/ExpressVPN.CLI';

  constructor() {}

  /**
   * Connect to a specific VPN location
   * @param location - VPN location (e.g., "Australia - Melbourne")
   */
  async vpnConnect(location: string): Promise<void> {
    try {
      console.log(`Connecting to VPN location: ${location}`);
      const command = `& "${this.expressvpnPath}" connect "${location}"`;
      const { stdout, stderr } = await execAsync(command, { shell: 'powershell.exe' });

      if (stderr && !stderr.includes('Connected to')) {
        throw new Error(`VPN connection failed: ${stderr}`);
      }

      console.log(`VPN connected successfully: ${stdout}`);
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
      const command = `& "${this.expressvpnPath}" disconnect`;
      const { stdout, stderr } = await execAsync(command, { shell: 'powershell.exe' });

      if (stderr && !stderr.includes('Disconnected')) {
        console.warn(`VPN disconnect warning: ${stderr}`);
      }

      console.log(`VPN disconnected: ${stdout}`);
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
      const command = `& "${this.expressvpnPath}" status`;
      const { stdout, stderr } = await execAsync(command, { shell: 'powershell.exe' });

      if (stderr) {
        console.warn(`VPN status check warning: ${stderr}`);
      }

      // Parse status from output
      if (stdout.toLowerCase().includes('connected')) {
        return 'connected';
      } else if (stdout.toLowerCase().includes('disconnected')) {
        return 'disconnected';
      } else {
        return 'unknown';
      }
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
      const command = `& "${this.expressvpnPath}" list`;
      const { stdout, stderr } = await execAsync(command, { shell: 'powershell.exe' });

      if (stderr) {
        console.warn(`VPN list locations warning: ${stderr}`);
      }

      // Parse locations from output (this will depend on ExpressVPN output format)
      const locations = stdout
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
  async sleepVPN(ms: number): Promise<void> {
    await setTimeout(ms);
  }

  /**
   * Get current IP address (useful for verifying VPN connection)
   * @returns Promise<string> - Current public IP address
   */
  async getCurrentIP(): Promise<string> {
    try {
      // Using a simple curl command to get IP
      const command = 'curl -s https://api.ipify.org';
      const { stdout, stderr } = await execAsync(command, { shell: 'powershell.exe' });

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
}
