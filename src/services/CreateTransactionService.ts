import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Invalid transaction type');
    }

    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      console.log(`totalBudget=${total} outcome:${value}`);
      if (total < value) {
        console.log('Entrou');
        throw Error('Not enough budget to finish this transaction');
      }
    }
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
