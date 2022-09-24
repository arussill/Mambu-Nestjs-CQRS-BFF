import { AggregateRoot } from '@nestjs/cqrs';
import { AccountState, AccountType } from '../enums';

export class Deposit extends AggregateRoot {
  constructor(
    private readonly _accountHolderKey: string,
    private readonly _accountHolderType: string,
    private readonly _name: string,
    private readonly _productTypeKey: string,
  ) {
    super();
  }

  public get accountHolderType(): string {
    return this._accountHolderType;
  }
  public get accountHolderKey(): string {
    return this._accountHolderKey;
  }
  public get name(): string {
    return this._name;
  }
  public get productTypeKey(): string {
    return this._productTypeKey;
  }
  public get accountState(): AccountState {
    return this._accountState;
  }
  public get balances(): Balances {
    return this._balances;
  }

  private readonly notes?: string;
  private readonly _balances?: Balances;
  private readonly accountType?: AccountType;
  private readonly currencyCode?: string;
  private readonly _accountState?: AccountState;
}

interface Balances {
  availableBalance?: number;
  blockedBalance?: number;
  feesDue?: number;
  forwardAvailableBalance?: number;
  holdBalance?: number;
  lockedBalance?: number;
  overdraftAmount?: number;
  overdraftInterestDue?: number;
  technicalOverdraftAmount?: number;
  technicalOverdraftInterestDue?: number;
  totalBalance?: number;
}
