import { Solver } from "src/app/models/solver.model";
import { getNumberFromString } from "src/app/utils/type-conversion";

type Workflow = {
  name: string,
  rules: Rule[]
}

type Rule = {
  operand?: Operand,
  operator?: Operator,
  value?: number
  ruleName?: string
}

type Rating = {
  x: number,
  m: number,
  a: number,
  s: number
}

type Range = Record<Operand, [number, number]>;

enum Operand {
  x = 'x',
  m = 'm',
  a = 'a',
  s = 's'
}

enum Operator {
  LESS = '<',
  MORE = '>'
}

export default class Day19 extends Solver {

  data = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`;


  public override part1(rawInput: string) {
    const [workflowStrs, ratingStrs] = rawInput.replace(/\r/g, '').split('\n\n').map(str => str.split('\n'));
    const workflows = workflowStrs.map(workflow => this.parseWorkflow(workflow));
    const ratings: Rating[] = ratingStrs.map(rating => this.parseRating(rating));
    const acceptedRatings: Rating[] = [];
    ratings.forEach(rating => {
      let currentWorkflowName = 'in';
      while (currentWorkflowName != 'A' && currentWorkflowName != 'R') {
        const currentWorkflow = workflows.find(w => w.name == currentWorkflowName);
        const rules = currentWorkflow?.rules as Rule[];
        for (let rule of rules) {
          if (!rule.operator
            || rule.operator == Operator.MORE && rating[rule.operand as Operand] > (rule.value as number)
            || rule.operator == '<' && rating[rule.operand as Operand] < (rule.value as number)) {
            currentWorkflowName = rule.ruleName as string;
            break;
          }
        }
      }
      if (currentWorkflowName == 'A') {
        acceptedRatings.push(rating);
      }
    });

    return acceptedRatings.reduce((sum, rating) => sum += rating.x + rating.m + rating.a + rating.s, 0);
  }

  public override part2(rawInput: string) {
    const [workflowStrs, ratingStrs] = rawInput.replace(/\r/g, '').split('\n\n').map(str => str.split('\n'));
    const workflows = workflowStrs.map(workflow => this.parseWorkflow(workflow));
    const range: Range = {
      x: [1, 4000],
      m: [1, 4000],
      a: [1, 4000],
      s: [1, 4000],
    };
    const validRanges = this.getValidRanges(workflows, "in", range);
    return validRanges.map((range) =>
      Object.values(range).reduce((acc, [min, max]) => acc * (max - min + 1), 1)
    ).reduce((acc: number, v: number) => acc + v, 0);
  }

  parseWorkflow(str: string): Workflow {
    const arr = str.split('{');
    const name = arr[0];
    const rules: Rule[] = arr[1].replace('}', '').split(',').map(ruleStr => {
      if (ruleStr.includes(':')) {
        const [condition, ruleName] = ruleStr.split(':');
        const operand = condition[0] as Operand;
        const operator = condition[1] as Operator;
        const value = +condition.substring(2);
        return { operator, operand, value, ruleName };
      } else {
        return { ruleName: ruleStr };
      }
    });
    return { name, rules };
  }

  parseRating(str: string): Rating {
    const ratingArr = str.split(',');
    return {
      x: getNumberFromString(ratingArr[0]),
      m: getNumberFromString(ratingArr[1]),
      a: getNumberFromString(ratingArr[2]),
      s: getNumberFromString(ratingArr[3])
    }
  }

  getValidRanges = (workflows: Workflow[], workflowName: string, range: Range): Range[] => {
    if (workflowName === "R") return [];
    if (workflowName === "A") {
      return [this.copyRange(range)];
    }
    const workflow = workflows.find(w => w.name == workflowName);
    const ranges = [];
    for (const rule of workflow?.rules as Rule[]) {
      if (!rule.operator) {
        ranges.push(...this.getValidRanges(workflows, rule.ruleName as string, this.copyRange(range)));
      }
  
      if (rule.operator === Operator.LESS) {
        const newRange = this.copyRange(range);
        newRange[rule.operand as Operand][1] = (rule.value as number) - 1;
        ranges.push(...this.getValidRanges(workflows, rule.ruleName as string, newRange));
        range[rule.operand as Operand][0] = rule.value as number;
      }
  
      if (rule.operator === Operator.MORE) {
        const newRange = this.copyRange(range);
        newRange[rule.operand as Operand][0] = (rule.value as number) + 1;
        ranges.push(...this.getValidRanges(workflows, rule.ruleName as string, newRange));
        range[rule.operand as Operand][1] = rule.value as number;
      }
    }
  
    return ranges;
  };

  copyRange(range: Range): Range {
    return JSON.parse(JSON.stringify(range));
  } 

}
