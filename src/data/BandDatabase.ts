import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class BandDatabase extends BaseDatabase {

private static TABLE_NAME = "NOME_TABELA_BANDAS";

 public async createBand(band: Band): Promise<void>{
    try {
        await this.getConnection()
        .insert({
            id: band.getId(),
            name: band.getName(),
            music_genre: band.getMainGenre(),
            responsible: band.getResponsible()
        
    }) 
    .into(BandDatabase.TABLE_NAME)  
    } catch (error) {
        throw new Error(error.sqlMessage || error.message)
    }
 }
}
