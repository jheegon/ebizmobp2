var dailydutys = [
    { empno:'105000049', empname:'홍길동', workdt:'2015-06-01', week:'월', worknm:'정상근무', start_tm:'075', end_tm:'204', out_tm:'', in_tm:'', iotm:'0', late_time:0, out_time:0, nor_time:8, ot1_time:2.7, ot2_time:0, night_time:0, week1_time:0, week2_time:0, paid1_time:0, paid2_time:0.3, total_time:11, nor_time_s:8, ot1_time_s:4.05, ot2_time_s:0, night_time_s:0, week1_time_s:0, week2_time_s:0, paid1_time_s:0, paid2_time_s:0, total2_time:12.35  }, 
    { empno:'105000049', empname:'홍길동', workdt:'2015-06-02', week:'화', worknm:'정상근무', start_tm:'075', end_tm:'204', out_tm:'', in_tm:'', iotm:'0', late_time:0, out_time:0, nor_time:8, ot1_time:2.7, ot2_time:0, night_time:0, week1_time:0, week2_time:0, paid1_time:0, paid2_time:0.3, total_time:11, nor_time_s:8, ot1_time_s:4.05, ot2_time_s:0, night_time_s:0, week1_time_s:0, week2_time_s:0, paid1_time_s:0, paid2_time_s:0, total2_time:12.35  }, 
    { empno:'105000049', empname:'홍길동', workdt:'2015-06-03', week:'수', worknm:'정상근무', start_tm:'075', end_tm:'173', out_tm:'', in_tm:'', iotm:'0', late_time:0, out_time:0, nor_time:8, ot1_time:0, ot2_time:0, night_time:0, week1_time:0, week2_time:0, paid1_time:0, paid2_time:0, total_time:8, nor_time_s:8, ot1_time_s:0, ot2_time_s:0, night_time_s:0, week1_time_s:0, week2_time_s:0, paid1_time_s:0, paid2_time_s:0, total2_time:8  }, 
    { empno:'105000049', empname:'홍길동', workdt:'2015-06-04', week:'목', worknm:'정상근무', start_tm:'075', end_tm:'204', out_tm:'', in_tm:'', iotm:'0', late_time:0, out_time:0, nor_time:8, ot1_time:2.7, ot2_time:0, night_time:0, week1_time:0, week2_time:0, paid1_time:0, paid2_time:0.3, total_time:11, nor_time_s:8, ot1_time_s:4.05, ot2_time_s:0, night_time_s:0, week1_time_s:0, week2_time_s:0, paid1_time_s:0, paid2_time_s:0, total2_time:12.35  }, 
    { empno:'105000049', empname:'홍길동', workdt:'2015-06-05', week:'금', worknm:'정상근무', start_tm:'075', end_tm:'173', out_tm:'', in_tm:'', iotm:'0', late_time:0, out_time:0, nor_time:8, ot1_time:0, ot2_time:0, night_time:0, week1_time:0, week2_time:0, paid1_time:0, paid2_time:0, total_time:8, nor_time_s:8, ot1_time_s:0, ot2_time_s:0, night_time_s:0, week1_time_s:0, week2_time_s:0, paid1_time_s:0, paid2_time_s:0, total2_time:8  }, 
    { empno:'105000049', empname:'홍길동', workdt:'2015-06-06', week:'토', worknm:'특근', start_tm:'072', end_tm:'173', out_tm:'', in_tm:'', iotm:'0', late_time:0, out_time:0, nor_time:0, ot1_time:0, ot2_time:0, night_time:0, week1_time:8, week2_time:0, paid1_time:8, paid2_time:0, total_time:16, nor_time_s:0, ot1_time_s:0, ot2_time_s:0, night_time_s:0, week1_time_s:12, week2_time_s:0, paid1_time_s:0, paid2_time_s:0, total2_time:20  }, 
    { empno:'105000049', empname:'홍길동', workdt:'2015-06-07', week:'일', worknm:'', start_tm:'', end_tm:'', out_tm:'', in_tm:'', iotm:'0', late_time:0, out_time:0, nor_time:0, ot1_time:0, ot2_time:0, night_time:0, week1_time:0, week2_time:0, paid1_time:8, paid2_time:0, total_time:8, nor_time_s:0, ot1_time_s:0, ot2_time_s:0, night_time_s:0, week1_time_s:0, week2_time_s:0, paid1_time_s:0, paid2_time_s:0, total2_time:8  } 
];

exports.findByDay = function (req, res, next) {
    var day = req.params.day;
    
    for(var i = 0; i < dailydutys.length -1; i++){
        if(dailydutys[i].workdt === day){
            res.send(dailydutys[i]);
            break;
        }
    }
};
