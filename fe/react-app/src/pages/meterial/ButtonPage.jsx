import MeterialButton from '../../components/meterial/MeterialButton';

const ButtonPage = () => {
    const saveHandler = () => {
        console.log(`debug >>>> save button click`);
    }
    const listHandler = () => {
       console.log(`debug >>>> list button click`);

    }
    return(
        <div>
            <MeterialButton title="글 작성하기" onClick={(e) => saveHandler()}/>
            <MeterialButton title='글 목록보기' onClick={(e) => listHandler()}/>
        </div>
    );
}

export default ButtonPage;