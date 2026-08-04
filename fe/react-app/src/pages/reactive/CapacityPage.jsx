import Button from "../../components/styled/Button";
import { useState, useEffect } from "react";

const CapacityPage = () => {
    // console.log(`debug >>>> CapacityPage load event`);

    // 고민?
    // 해당함수는 양방향 실시간 소통이 이루어져야한다...어떻게?
    // let cnt = 0;
    // solution -> hook state : useState()
    let [cnt, setCnt] = useState(0);

    const upCntHandler = (e) => {
        if(cnt < 10) {
            // cnt = cnt + 1;
            setCnt(cnt => cnt + 1);
            // console.log(`debug >>>> upCntHandler ${cnt}`);
        }
    }
    const downCntHandler = (e) => {
        if(cnt > 0) {            
            // cnt = cnt - 1;
            setCnt(cnt => cnt - 1);
            // console.log(`debug >>>> downCntHandler ${cnt}`);
        }
    }

    // side effect 으로 렌더링 이후 작업이 필요한 경우...
    // useEffect() 함수를 이용해서 작업할 수 있다.
    useEffect(() => {
        console.log(`debug >>>> CapacityPage lifecycle mount, unmount`);
        console.log(`debug >>>> side effect render cnt ${cnt}`);
    }, [cnt]);

    /////////////////////////////////////////////////////
    /*
    - 입장인원(10명)
    = 입장, 퇴장 버튼을 만들어서
    - 입장버튼을 클릭하면 인원수가 증가되고 입장인원이 꽉차면 버튼을 비활성화
    - 퇴장버튼을 클릭하면 인원수가 감소되고 입장인원이 0이 되면 버튼을 비활성화
    */
   return(
    <div>
        <p>입장인원 : {cnt}</p>
        <Button title="입장" onClick={(e) => upCntHandler()}/>
        <Button title="퇴장" onClick={(e) => downCntHandler()}/>
    </div>
   );
}

export default CapacityPage;