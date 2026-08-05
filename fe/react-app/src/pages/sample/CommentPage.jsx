import { useEffect, useState } from 'react';
import api from '../../api/axios';
import Comment from '../../components/sample/Comment';

const CommentPage = () => {
    // script
    console.log(`debug >>>> CommentPage load event`);
    // let commnets = [
    //     {
    //         "writer" : "임정섭",
    //         "comment" : "강사님과 함께하는 즐거운 React..."
    //     },
    //     {
    //         "writer" : "차현준",
    //         "comment" : "강사님과 함께하는 재미없는 React..."
    //     },
    //     {
    //         "writer" : "박선아",
    //         "comment" : "강사님과 함께하는 즐겁지아니한 React..."
    //     }
    // ];
    let [commnets, setCommnets] = useState([]);
    
    const loadData = async () => {
        await api.get('/comment')
            .then(response => {
                console.log(`debug >>>> response `, response.data);
                setCommnets(response.data);
            })
            .catch(err => {
                console.log(`debug >>>>  err `, err);
            });
    }

    useEffect(() => {
        loadData();
    }, []);
    // UI
    return(
        <div>
            {
                commnets?.map ((comment, idx) => {
                    return <Comment 
                        key={idx}
                        data={comment}/>
                }) ?? []
            }
        </div>
    )
}

export default CommentPage;