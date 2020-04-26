export class currentUSData {
  positive:number;
  positivePretty: string;
  negative: number;
  negativePretty: string;
  pending: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number;
  inIcuCumulative: number;
  onVentilatorCurrently: number;
  onVentilatorCumulative: number;
  recovered: number;
  hash: string;
  lastModified: Date;
  death: number;
  deathPretty: string;
  hospitalized: number;
  total: number;
  totalPretty: string;
  totalTestResults: number;
  posNeg: number;
  notes: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);   
  }
}

export class historicalUSDataItem {
  date: Date;
  states: number;
  positive:number;
  positivePretty: string;
  negative: number;
  negativePretty: string;
  pending: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number;
  inIcuCumulative: number;
  onVentilatorCurrently: number;
  onVentilatorCumulative: number;
  recovered: number;
  hash: string;
  dateChecked: Date;
  death: number;
  deathIncrease: number;
  hospitalizedIncrease: number;
  negativeIncrease: number;
  positiveIncrease: number;
  totalTestResultsIncrease: number;
  deathPretty: string;
  hospitalized: number;
  total: number;
  totalPretty: string;
  totalTestResults: number;
  posNeg: number;
  notes: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);   
  }
}

export class historicalUSData {
  items: historicalUSDataItem[];
}

export class currentStateDataItem {
  state:string;
  positive: number;
  positiveScore: number;
  negativeScore: number;
  negativeRegularScore: number;
  commercialScore: number;
  grade: string;
  score: number;
  notes: string;
  dataQualityGrade: string;
  negative: number;
  pending: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number;
  inIcuCumulative: number;
  onVentilatorCurrently: number;
  onVentilatorCumulative: number;
  recovered: number;
  lastUpdateEt: Date;
  checkTimeEt: Date;
  death: number;
  hospitalized: number;
  total: number;
  totalTestResults: number;
  posNeg: number;
  fips: string;
  dateModified: Date;
  dateChecked: Date;
  hash: string;
}

export class currentStateData {
  items: currentStateDataItem[];
}

