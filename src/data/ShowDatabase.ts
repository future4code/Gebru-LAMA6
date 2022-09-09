import { BaseError } from "../error/BaseError";
import { Show, } from "../model/Show";

import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
  private static TABLE_SHOWS = "lama_shows"
  private static TABLE_BANDS = "lama_bands"

  public async findShowByTime(week_day: string, start_time: number, end_time: number) {
    try {
      const result = await this.getConnection()
        .select("start_time", "week_day", "end_time")
        .orderBy("week_day")
        .where("week_day", `${week_day}`)
        .whereBetween("start_time", [`${start_time}`, `${end_time}`])
        .from(ShowDatabase.TABLE_SHOWS)
      
      return result[0]
      
    } catch (error:any) {
        throw new Error(error.message || error.sqlMessage);
    }
  }

  public async findShowByWeekday(weekday: string) {
    try {
      const result = await this.getConnection()
        .select("lama_bands.name as band", "lama_bands.music_genre as genre")
        .from(ShowDatabase.TABLE_BANDS)
        .join(ShowDatabase.TABLE_SHOWS, "lama_bands.id", "lama_shows.band_id")
        .orderBy("lama_shows.start_time")
        .where("week_day", `${weekday}`)
      
      return result

    } catch (error:any) {
      
     throw new Error(error.message || error.sqlMessage);
    }
  }

  public async createShow(
    id: string,
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string) {
    try {
      await this.getConnection()
        .insert({
          id, week_day, start_time, end_time, band_id
        })
        .into(ShowDatabase.TABLE_SHOWS)

    } catch (error:any) {
        throw new Error(error.message || error.sqlMessage);
    }
  }
}