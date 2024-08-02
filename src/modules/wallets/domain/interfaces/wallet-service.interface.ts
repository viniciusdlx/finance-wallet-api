import { CreateWalletDto } from '../../presentation/dtos/create-wallet.dto';
import { UpdateWalletBalanceDto } from '../../presentation/dtos/update-wallet-balance.dto';
import { WalletOutputDto } from '../../presentation/dtos/wallet-output.dto';

export interface IWalletService {
    create(request: CreateWalletDto): Promise<WalletOutputDto>;
    findByUserId(id: string): Promise<WalletOutputDto[]>;
    updateBalance(id: string, request: UpdateWalletBalanceDto): Promise<void>;
    findById(id: string): Promise<WalletOutputDto>;
}
