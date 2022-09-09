export class Show {
    constructor(
      private id: string,
      private week_day: string,
      private start_time: number,
      private end_time: number,
      private band_id: string
    ) {}
  
  }
  export interface ShowInputDTO {
    week_day: WeekDay;
    start_time: string;
    end_time: string;
    band_id: string
  }
  
  export enum WeekDay {
    SEXTA = "SEXTA",
    SABADO = "SÁBADO",
    DOMINGO = "DOMINGO"
  }