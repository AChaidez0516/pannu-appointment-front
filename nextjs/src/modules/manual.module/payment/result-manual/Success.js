import Image from 'next/image'
import { format, parse } from 'date-fns'
import {
    Wrapper,
    Text,
    BankImgWrapper,
    TableWrapper,
    Cell,
    TableRow
} from './styled'

function Success({ transactions, state, msg }) {
  const getTotalFee = () => {
    let sum = 0
    transactions?.forEach(v => {
      sum += v.fee
    })
    return sum
  }
  return (
    <div style={{ padding: 12, marginBottom: 24 }}>
      <Wrapper>
        {state === 'success' ? (
          <Image width={30} height={30} src="/assets/images/ico-check.png" />
        ) : (
          <Image width={30} height={30} src="/assets/images/ico-failure.png" />
        )}
        <Text>{msg}</Text>
      </Wrapper>
      { (transactions?.map(data => (
        <>
          <BankImgWrapper>
            <Image width={26} height={12} src="/assets/images/bank-ico.png" />
            {data.cardNumber}
          </BankImgWrapper>
          <TableWrapper>
            <TableRow>
              <Cell>Date</Cell>
              <Cell>{ format(parse(data.dateToCharge, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy') }</Cell>
            </TableRow>
            <TableRow>
              <Cell>Charge Amount</Cell>
              <Cell>{data.amount}</Cell>
            </TableRow>
            <TableRow>
              <Cell>Convenience Fee</Cell>
              <Cell>{data.fee}</Cell>
            </TableRow>
          </TableWrapper>
        </>
      ))) }
      <hr />
      <TableRow>
        <Cell>Total Fee</Cell>
        <Cell>{getTotalFee()}</Cell>
      </TableRow>
    </div>
  )
}

export default Success
