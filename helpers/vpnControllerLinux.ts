import { exec } from 'child_process';
import { promisify } from 'util';
import { setTimeout } from 'timers/promises';
import type { IVpnController } from './vpnControllerFactory';

const execAsync = promisify(exec);

const EXPRESSVPN_CLI = 'expressvpnctl';

export class VpnControllerLinux implements IVpnController {
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

  async vpnDisconnect(): Promise<void> {
    try {
      console.log('Disconnecting VPN...');
      await this.runVPN(`${EXPRESSVPN_CLI} disconnect`);
      console.log(`VPN disconnected`);
    } catch (error) {
      console.error(`Failed to disconnect VPN: ${error}`);
    }
  }

  async vpnCheckStatus(): Promise<string> {
    try {
      const status = await this.runVPN(`${EXPRESSVPN_CLI} status`);
      return status.trim();
    } catch (error) {
      console.error(`Failed to check VPN status: ${error}`);
      return 'error';
    }
  }

  async vpnListLocations(): Promise<string[]> {
    try {
      const output = await this.runVPN(`${EXPRESSVPN_CLI} list`);
      return output
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.trim());
    } catch (error) {
      console.error(`Failed to list VPN locations: ${error}`);
      return [];
    }
  }

  async getCurrentIP(): Promise<string> {
    try {
      const { stdout, stderr } = await execAsync('curl -s https://api.ipify.org');
      if (stderr) throw new Error(`Failed to get IP: ${stderr}`);
      return stdout.trim();
    } catch (error) {
      console.error(`Failed to get current IP: ${error}`);
      return 'unknown';
    }
  }

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

  async sleepVPN(ms: number): Promise<void> {
    await setTimeout(ms);
  }
}
