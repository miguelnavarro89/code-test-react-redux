import { always, cond, equals, T } from "ramda";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectStatus } from "../../slice";
import Aside from "./aside";
import Main from "./main";

function Movies() {
    const status = useSelector(selectStatus)

    return (
        <Wrapper>
            {cond([
                [equals('pending'), always('Loading...')],
                [equals('failed'), always('An Error occurred, try later...')],
                [T, always(
                    <>
                        <Aside />
                        <Main />
                    </>
                )],
            ])(status)}
        </Wrapper>
    );
}
const Wrapper = styled.div`
    flex-grow: 1;
    width: 100%;
    display: flex;
    align-items: stretch;
    overflow-y: auto;
    --webkit-overflow-scrolling: touch;
`

export default Movies;
