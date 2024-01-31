export type BindingPower = number;

export type BindingPowerEntry = { left: BindingPower, right: BindingPower };
export type BindingPowers = { [key: string]: BindingPowerEntry };

export const bindingPowers: BindingPowers = {
  lowest: { left: 0, right: 1 },
  assignment: { left: 31, right: 30 },
  comparison: { left: 41, right: 40 },
  summative: { left: 50, right: 51 },
  productive: { left: 60, right: 61 },
  prefix: { left: 70, right: 71 },
  call: { left: 80, right: 81 },
};

export const getInfixBindingPower = (infix: string): BindingPowerEntry => {
  switch (infix) {
    case "=":
      return bindingPowers.assignment;

    case "==":
    case "!=":
    case ">":
    case "<":
    case ">=":
    case "<=":
      return bindingPowers.comparison;

    case "+":
    case "-":
      return bindingPowers.summative;

    case "*":
    case "/":
      return bindingPowers.productive;

    // for function call, it behaves an infix operator which lies between
    // function expression and parameter list, e.g, print("hello")
    case "(":
      return bindingPowers.call;

    default:
      return bindingPowers.lowest;
  }
};
