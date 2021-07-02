import { providers } from 'ethers';
import { Transaction, WETH } from 'simple-uniswap-sdk';
import { SupportedNetworkTokens } from './models';

export class EthereumProvider {
  private _ethersProvider:
    | providers.StaticJsonRpcProvider
    | providers.JsonRpcProvider
    | providers.InfuraProvider
    | providers.Web3Provider;

  constructor(private _address: string, provider: any) {
    if (provider._isProvider) {
      this._ethersProvider = provider;
    } else {
      this._ethersProvider = new providers.Web3Provider(provider);
    }
  }

  /**
   * Get the ethereum address
   */
  public get address(): string {
    return this._address;
  }

  /**
   * Get the ethers provider
   */
  public get provider():
    | providers.StaticJsonRpcProvider
    | providers.JsonRpcProvider
    | providers.InfuraProvider
    | providers.Web3Provider {
    return this._ethersProvider;
  }

  /**
   * Send async
   * @param transaction The transaction
   */
  public async sendAsync(transaction: Transaction): Promise<string> {
    return await this.provider.send('eth_sendTransaction', [transaction]);
  }

  /**
   * Is support chain
   */
  public isSupportedChain(
    chainId: number,
    supportedNetworkTokens: SupportedNetworkTokens[],
  ): boolean {
    try {
      WETH.token(chainId);

      return (
        supportedNetworkTokens.find((t) => t.chainId === chainId) !== undefined
      );
    } catch (error) {
      return false;
    }
  }

  //   /**
  //    * Send async
  //    * @param transaction The transaction
  //    */
  //   public async sendAsync(transaction: Transaction): Promise<string> {
  //     return await this._ethersInstance.provider.request!({
  //       method: 'eth_sendTransaction',
  //       params: [transaction],
  //     });
  //   }
}