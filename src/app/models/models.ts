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

