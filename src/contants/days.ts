export enum Days {
    Su = 0,
    Mo,
    Tu,
    We,
    Th,
    Fr,
    Sa
  }
  
export module Days {
export function getValues() {
    return [Days.Su, Days.Mo, Days.Tu, Days.We, Days.Th, Days.Fr, Days.Sa];
}
}
