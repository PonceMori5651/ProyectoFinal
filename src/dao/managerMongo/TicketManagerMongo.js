const ticketModel = require('../models/ticketModel');
class TicketManagerMongo{
    constructor(){
        this.model = ticketModel
    }

    createTicket(data){
        return this.model.create(data)
    }

}

module.exports = TicketManagerMongo