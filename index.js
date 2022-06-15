import express from "express";
import cors from "cors"; 
import { request } from "express";
import { response } from "express";

const server = express();
server.use(cors());

const holidays =[
    { date: "1/1/2022", idMonth: "1",  name: "Confraternização mundial" },
    { date: "1/3/2022", idMonth: "1", name: "Carnaval" },
    { date: "4/17/2022", idMonth: "4", name: "Páscoa" },
    { date: "4/21/2022", idMonth: "4", name: "Tiradentes" },
    { date: "5/1/2022", idMonth: "5", name: "Dia do trabalho" },
    { date: "6/16/2022", idMonth: "6", name: "Corpus Christi" },
    { date: "9/7/2022", idMonth: "9", name: "Independência do Brasil" },
    { date: "10/12/2022", idMonth: "10", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", idMonth: "11", name: "Finados" },
    { date: "11/15/2022", idMonth: "11", name: "Proclamação da República" },
    { date: "12/25/2022", idMonth: "12", name: "Natal" }
];

server.get("/holidays", (request, response) =>{

    response.send(holidays);
});


server.get("/is-today-holiday",(request, response)=>{
    const data = new Date()
    const today = `${data.getMonth()+1}/${data.getDate()}/${data.getFullYear()}`

    const isHoliday = holidays.filter(holiday => holiday.date === today);

    if(isHoliday != 0){
    response.send(`Sim, hoje é ${isHoliday[0].name}`);
    }else{
    response.send(`Não, hoje não é feriado`);
    };
    

});

server.get("/holidays/:idMonth",(request,response)=>{
    const month = request.params.idMonth;
        if(month > 0 && month <13){
            const holidaysOfTheMonth = holidays.some(holiday => month == holiday.idMonth);

            if(holidaysOfTheMonth){
                response.send(holidays.filter((holiday, index)=> holiday.idMonth == month)); 
            }else{
                response.send("Não tem feriado esse mês...");
            }
        }else{
            response.send("Esse mês não existe.");  
        }  
    
})

server.listen(5000);