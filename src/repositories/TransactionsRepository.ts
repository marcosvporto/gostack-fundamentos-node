import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.value += curr.value;
          return acc;
        }

        return acc;
      },
      new Transaction({
        title: '1',
        type: 'income',
        value: 0,
      }),
    );
    const outcomes = this.transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'outcome') {
          acc.value += curr.value;
          return acc;
        }

        return acc;
      },
      new Transaction({
        title: '1',
        type: 'outcome',
        value: 0,
      }),
    );
    return {
      income: incomes.value,
      outcome: outcomes.value,
      total: incomes.value - outcomes.value,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
