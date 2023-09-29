import Layout from '../../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import {
  SEX,
  MARTIAL_STATUS,
  PATIENT_HISTORY_STATUS,
  OCCUPATION,
} from '../../constant/global'
import { Table } from 'evergreen-ui'

import styled from 'styled-components'

const InputFieldLabel = styled.div`
  position: absolute;
  top: -15px;
  left: 5px;
  background: white;
  padding: 8px 0 0 5px;
  z-index: 10;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #000000;
`
const InputDiv = styled.div`
  display: flex;
  position: relative;
  margin: 20px 0px 0 0px;
  justify-content: space-between;
`
const Input = styled.input`
  border: 0.5px solid #5a585d;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  width: 100%;
  padding: 10px 10px 10px 10px;
`
const Select = styled.select`
  background: #ffffff;
  border: 0.5px solid #5a585d;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;

  padding: 10px 46px 10px 4px;
`
const ContinueButton = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 14px;
  color: #173fd4;

  display: flex;
  justify-content: center;
`
const AgreementContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`
const Title = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: #000000;
`
const TableTitle = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #000000;
`

function Payment_Plan() {
  return (
    <Layout title="POEM payment plan" href="/poem/payment_protection">
      <AgreementContentDiv>
        <Title>Choose your payment frequency </Title>
      </AgreementContentDiv>

      <AgreementContentDiv>
        <Title style={{ textDecorationLine: 'underline' }}>Preypay </Title>
      </AgreementContentDiv>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}
        >
          <input type="radio" name="prepay" />
          <InputDiv style={{ width: 140 }}>
            <InputFieldLabel>One time payment of </InputFieldLabel>
            <Input />
          </InputDiv>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}
        >
          <input type="radio" name="prepay" />
          <InputDiv style={{ width: 140 }}>
            <InputFieldLabel>One time payment of </InputFieldLabel>
            <Input />
          </InputDiv>
        </div>
      </div>
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
            }}
          >
            <AgreementContentDiv>
              <Title style={{ fontSize: 12, padding: 15 }}>
                (Total of installments-1st payment) / No. equal
                installments=Each payment{' '}
              </Title>
            </AgreementContentDiv>
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', marginTop: 15 }}
          >
            <InputDiv style={{ width: 140, marginTop: 20 }}>
              <InputFieldLabel
                style={{ top: '-15px', width: 90, padding: '0 8px 0 4px' }}
              >
                1st payment{' '}
              </InputFieldLabel>
              <InputFieldLabel
                style={{
                  top: '-3px',
                  width: 95,
                  fontSize: 10,
                  padding: '0 8px 0 4px',
                  color: '#29B05A',
                }}
              >
                (Min. 40% of Prepay){' '}
              </InputFieldLabel>
              <Input />
            </InputDiv>
            <InputDiv style={{ width: 140, marginTop: 20 }}>
              <InputFieldLabel>No. equal installments</InputFieldLabel>
              <Select style={{ width: 140, padding: '10px 0px 10px 0px' }}>
                <option></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Select>
            </InputDiv>
            <InputDiv style={{ width: 140, marginTop: 20 }}>
              <InputFieldLabel>Each payment</InputFieldLabel>
              <Input />
            </InputDiv>
          </div>
        </div>
      </>

      <AgreementContentDiv>
        <Title style={{ textDecorationLine: 'underline' }}>PPI </Title>
      </AgreementContentDiv>
      <AgreementContentDiv
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Title>I decline the payment protection insurance </Title>
        <input
          type="checkbox"
          name="prepay"
          style={{ width: 15, height: 15 }}
        />
      </AgreementContentDiv>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}
        >
          <input type="radio" name="prepay" />
          <InputDiv style={{ width: 140 }}>
            <InputFieldLabel>One time payment of </InputFieldLabel>
            <Input />
          </InputDiv>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}
        >
          <input type="radio" name="prepay" />
          <InputDiv style={{ width: 140 }}>
            <InputFieldLabel>One time payment of </InputFieldLabel>
            <Input />
          </InputDiv>
        </div>
      </div>
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
            }}
          >
            <AgreementContentDiv>
              <Title style={{ fontSize: 12, padding: 15 }}>
                (Total of installments-1st payment) / No. equal
                installments=Each payment{' '}
              </Title>
            </AgreementContentDiv>
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', marginTop: 15 }}
          >
            <InputDiv style={{ width: 140, marginTop: 20 }}>
              <InputFieldLabel
                style={{ top: '-15px', width: 90, padding: '0 8px 0 4px' }}
              >
                1st payment{' '}
              </InputFieldLabel>
              <InputFieldLabel
                style={{
                  top: '-3px',
                  width: 95,
                  fontSize: 10,
                  padding: '0 8px 0 4px',
                  color: '#29B05A',
                }}
              >
                (Min. 40% of Prepay){' '}
              </InputFieldLabel>
              <Input />
            </InputDiv>
            <InputDiv style={{ width: 140, marginTop: 20 }}>
              <InputFieldLabel>No. equal installments</InputFieldLabel>
              <Select style={{ width: 140, padding: '10px 0px 10px 0px' }}>
                <option></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Select>
            </InputDiv>
            <InputDiv style={{ width: 140, marginTop: 20 }}>
              <InputFieldLabel>Each payment</InputFieldLabel>
              <Input />
            </InputDiv>
          </div>
        </div>
      </>
      <AgreementContentDiv>
        <Title style={{ fontSize: 14 }}>Payment charged today $400.00 </Title>
      </AgreementContentDiv>

      <Table.Body height={86} style={{ marginTop: 15 }}>
        <Table.Row
          height={22}
          style={{
            borderBottom: 0,
            borderRadius: '5px 5px 0 0',
            background: '#173FD4',
          }}
        >
          <Table.TextCell flexBasis={135} flexShrink={0} flexGrow={0}>
            <TableTitle style={{ color: '#FFFFFF' }}>
              Payment schedule
            </TableTitle>
          </Table.TextCell>
          <Table.TextCell>
            <TableTitle style={{ color: '#FFFFFF' }}>Date</TableTitle>
          </Table.TextCell>
          <Table.TextCell>
            <TableTitle style={{ color: '#FFFFFF' }}>Amount</TableTitle>
          </Table.TextCell>
        </Table.Row>
        <Table.Row height={22} style={{ borderBottom: 0 }}>
          <Table.TextCell
            style={{
              borderLeft: '1px solid #99A0B1',
              borderRight: '1px solid #99A0B1',
              borderBottom: '1px solid #99A0B1',
            }}
            flexBasis={135}
            flexShrink={0}
            flexGrow={0}
          >
            <TableTitle>Next payment</TableTitle>
          </Table.TextCell>
          <Table.TextCell style={{ borderBottom: '1px solid #99A0B1' }}>
            <TableTitle>MM/DD/YYYY</TableTitle>
          </Table.TextCell>
          <Table.TextCell
            style={{
              background: '#CDFDD2',
              borderLeft: '1px solid #99A0B1',
              borderRight: '1px solid #99A0B1',
              borderBottom: '1px solid #99A0B1',
            }}
          >
            <Title>400.00</Title>
          </Table.TextCell>
        </Table.Row>
        <Table.Row height={22} style={{ borderBottom: 0 }}>
          <Table.TextCell
            style={{
              borderLeft: '1px solid #99A0B1',
              borderRight: '1px solid #99A0B1',
              borderBottom: '1px solid #99A0B1',
            }}
            flexBasis={135}
            flexShrink={0}
            flexGrow={0}
          >
            <TableTitle>Next payment</TableTitle>
          </Table.TextCell>
          <Table.TextCell style={{ borderBottom: '1px solid #99A0B1' }}>
            <TableTitle>MM/DD/YYYY</TableTitle>
          </Table.TextCell>
          <Table.TextCell
            style={{
              background: '#CDFDD2',
              borderLeft: '1px solid #99A0B1',
              borderRight: '1px solid #99A0B1',
              borderBottom: '1px solid #99A0B1',
            }}
          >
            <Title>400.00</Title>
          </Table.TextCell>
        </Table.Row>
        <Table.Row height={22} style={{ borderBottom: 0 }}>
          <Table.TextCell
            style={{
              borderLeft: '1px solid #99A0B1',
              borderRight: '1px solid #99A0B1',
              borderBottom: '1px solid #99A0B1',
            }}
            flexBasis={135}
            flexShrink={0}
            flexGrow={0}
          >
            <TableTitle>Next payment</TableTitle>
          </Table.TextCell>
          <Table.TextCell style={{ borderBottom: '1px solid #99A0B1' }}>
            <TableTitle>MM/DD/YYYY</TableTitle>
          </Table.TextCell>
          <Table.TextCell
            style={{
              background: '#CDFDD2',
              borderLeft: '1px solid #99A0B1',
              borderRight: '1px solid #99A0B1',
              borderBottom: '1px solid #99A0B1',
            }}
          >
            <Title>400.00</Title>
          </Table.TextCell>
        </Table.Row>
      </Table.Body>

      <div
        style={{
          background: '#DBE9FD',
          borderRadius: 5,
          display: 'flex',
          justifyContent: 'center',
          padding: 5,
          marginTop: 15,
        }}
      >
        <Title style={{ color: '#173FD4' }}>
          Credit cards will be charged 2% convenience fee
        </Title>
      </div>

      {/* <Link as={'/'} href="/security_questions/"> */}
      <ContinueButton onClick={() => test()}>
        Set up payment method
      </ContinueButton>
      {/* <ContinueButton>Set up security questions</ContinueButton> */}
      {/* </Link> */}
    </Layout>
  )
}

export default Payment_Plan
