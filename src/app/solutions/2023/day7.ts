import { Solver } from "src/app/models/solver.model";

enum HandType {
  FiveKind,
  FourKind,
  FullHouse,
  ThreeKind,
  TwoPairs,
  Pair,
  HighCard
}

interface Hand {
  cards: string;
  bid: number;
  type: HandType
}

export default class Day04 extends Solver {

  data = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

  cardStrength: { [key: string]: number } = {};

  cardStrength1: { [key: string]: number } = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2
  };

  cardStrength2: { [key: string]: number } = {
    A: 14,
    K: 13,
    Q: 12,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    J: 1
  };

  public override part1(rawInput: string) {
    this.cardStrength = this.cardStrength1;
    let hands = rawInput.split('\n').map(item => {
      const cards = item.split(' ')[0];
      const bid = +item.split(' ')[1];
      const type = this.getHandType(cards);
      return { cards, bid, type };
    });
    hands = hands.sort(this.sortHands.bind(this));
    console.log(hands);
    return hands.reduce((acc, hand, i) => acc + hand.bid * (i + 1), 0);
  }

  public override part2(rawInput: string) {
    this.cardStrength = this.cardStrength2;
    let hands = rawInput.split('\n').map(item => {
      const cards = item.split(' ')[0];
      const bid = +item.split(' ')[1];
      const type = this.getHandType(cards, true);
      return { cards, bid, type };
    });
    hands = hands.sort(this.sortHands.bind(this));
    console.log(hands);
    return hands.reduce((acc, hand, i) => acc + hand.bid * (i + 1), 0);
  }

  getHandType(cards: string, jokers?: boolean): HandType {
    const counter: { [key: string]: number } = {
      A: 0,
      K: 0,
      Q: 0,
      J: 0,
      T: 0,
      9: 0,
      8: 0,
      7: 0,
      6: 0,
      5: 0,
      4: 0,
      3: 0,
      2: 0
    };
    for (let card of cards) {
      counter[card]++;
    }
    const counts = Object.values(counter);
    let type;
    if (counts.find(count => count === 5)) {
      type = HandType.FiveKind;
    } else if (counts.find(count => count === 4)) {
      type = HandType.FourKind;
    } else if (counts.find(count => count === 3) && counts.find(count => count === 2)) {
      type = HandType.FullHouse;
    } else if (counts.find(count => count === 3)) {
      type = HandType.ThreeKind;
    } else {
      const pairIndex = counts.findIndex(count => count === 2);
      if (pairIndex != -1 && counts.find((count, i) => count === 2 && i !== pairIndex)) {
        type = HandType.TwoPairs;
      } else if (pairIndex != -1) {
        type = HandType.Pair;
      } else {
        type = HandType.HighCard;
      }
    }
    if (jokers && counter['J'] > 0)  {
      if (counts.find(count => count === 5)) {
        type = HandType.FiveKind;
      } else if (counts.find(count => count === 4)) {
        type = HandType.FiveKind;
      } else if (counts.find(count => count === 3) && counts.find(count => count === 2)) {
        type = HandType.FiveKind;
      } else if (counts.find(count => count === 3)) {
        type = HandType.FourKind;
      } else {
        const pairIndex = counts.findIndex(count => count === 2);
        if (pairIndex != -1 && counts.find((count, i) => count === 2 && i !== pairIndex)) {
          type = counter['J'] == 2 ? HandType.FourKind : HandType.FullHouse;
        } else if (pairIndex != -1) {
          type = HandType.ThreeKind;
        } else {
          type = HandType.Pair;
        }
      }
    }
    return type;
  }

  sortHands(a: Hand, b: Hand): number {
    if (a.type > b.type) {
      return -1;
    } else if (a.type < b.type) {
      return 1;
    } else {
      return this.compareCards(a.cards, b.cards);
    }
    return 0;
  }

  compareCards(a: string, b: string): number {
    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return this.cardStrength[a[i]] > this.cardStrength[b[i]] ? 1 : -1;
      }
    }
    return 0;
  }
}
