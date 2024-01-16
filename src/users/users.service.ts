import { Injectable } from '@nestjs/common';

@Injectable()

export class UsersService {
    create(data: Object){
        return [data]
    }
    findAll(){
        return []
    }
    findOne(id: String){
        return [id]
    }
    update(id: String, data: Object){
        return data
    }
    delete(){
        return []
    }
}
