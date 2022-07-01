import { useRouter } from 'next/router'
import Container from "../../components/container/Container";

const Steg = () => {
    const router = useRouter()
    const {steg} = router.query
    return <Container>
        { steg }
    </Container>
}

export default Steg