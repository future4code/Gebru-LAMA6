import { Request, Response } from "express"
import { ShowBusiness } from "../business/ShowBusiness"
import { BaseError } from "../error/BaseError"
import { ShowInputDTO, WeekDay } from "../model/Show"

export class ShowController{
  async create(req: Request, res: Response) {
    try{
      const input: ShowInputDTO =  {
        week_day: req.body.week_day.toUpperCase(),
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        band_id: req.body.band_id
      }

      const showBusiness = new ShowBusiness()
      const result = await showBusiness.createShow(input)
      res.send({message: "Show criado com sucesso!"})

    } catch(error){
      const err = error as BaseError
      res.status(400).send({error: err.message})
    }
  }

  async search(req: Request, res: Response){
    try {
      const { weekday } = req.params

      const showBusiness = new ShowBusiness()
      const result = await showBusiness.searchShow(weekday)

      res.send({result})
      
    } catch (error) {
      const err = error as BaseError
      res.status(400).send({error: err.message})
    }
  }

}