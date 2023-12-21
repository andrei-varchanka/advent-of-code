import { Solver } from "src/app/models/solver.model";

export default class Day04 extends Solver {

  data = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

  public override part1(rawInput: string) {
    let sum = 0;
    const arr = rawInput.split("\n");
    arr.forEach(card => {
      const numbers = card.split(': ')[1];
      const winningNumbers = numbers.split(' | ')[0].split(' ').map(number => +number);
      const ownNumbers = numbers.split(' | ')[1].split(' ').map(number => +number);
      const ownWinCount = winningNumbers.filter(number => ownNumbers.find(n => n == number)).length;
      if (ownWinCount > 0) {
        console.log(card, ' win: ', ownWinCount);
        sum += Math.pow(2, ownWinCount - 1);
      }
    });
    return sum;
  }

  public override part2(rawInput: string) {
    const arr = rawInput.split('\n');
    let cards = [];

    for (let i = 0; i < arr.length; i++) {
      const numbers = arr[i].split(': ')[1];
      const winningNumbers = numbers.split(' | ')[0].split(' ').filter(i => i).map(number => +number);
      const ownNumbers = numbers.split(' | ')[1].split(' ').filter(i => i).map(number => +number);
      const ownWinCount = winningNumbers.filter(number => ownNumbers.find(n => n == number)).length;
      cards.push({ cardNumber: i + 1, matches: ownWinCount });
    }

    for (let i = 0; i < cards.length; i++) {
      let cardNumber: number = cards[i].cardNumber;
      for (let j = 0; j < cards[i].matches; j++) {
        cards.push({ cardNumber: cards[cardNumber + j].cardNumber, matches: cards[cardNumber + j].matches });
      }
    }
    return cards.length;
  }
}
