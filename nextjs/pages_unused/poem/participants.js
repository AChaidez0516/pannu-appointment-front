import Image from 'next/image'
import Link from 'next/link'

import styled from 'styled-components'

import Layout from '../../components/Layout'

import { useState } from 'react'
import { useRouter } from 'next/router'

import { Table } from 'evergreen-ui'

const Description = styled.div`
  display: flex;
  flex-direction: column;
`
const DescriptionContent = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  color: #000000;
`

const Text = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 12px;
  color: #000000;
`
const Label = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 12px;
  color: #000000;
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
const CalcText = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 14px;
  color: #000000;
`
function Participants() {
  const router = useRouter()
  const [showReadMore, setShowReadMore] = useState(false)

  return (
    <Layout title="POEM participants" href="/poem/">
      <div style={{ display: 'flex', justifyContent: 'center', margin: 30 }}>
        <Image src="/assets/images/participants_banner.png" width="244" height="178" />
      </div>
      <Description>
        <DescriptionContent>
          Click to select the participants in POEM{' '}
        </DescriptionContent>
      </Description>

      <Table.Body>
        <Table.Row>
          <Table.TextCell flexBasis={135} flexShrink={0} flexGrow={0}>
            <Text>Name</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>Prepay</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>PPI</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>Total cost</Text>
          </Table.TextCell>
        </Table.Row>
        <Table.Row style={{ borderBottom: 0 }}>
          <Table.TextCell flexBasis={135} flexShrink={0} flexGrow={0}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <input
                type="checkbox"
                style={{
                  height: 15,
                  background: '#EEEEEE',
                  margin: '0 13px 0 0',
                }}
              />
              <Label>You</Label>
            </div>
          </Table.TextCell>
          <Table.TextCell>
            <Text>2,345.67</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>345.67</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>12,345.67</Text>
          </Table.TextCell>
        </Table.Row>
        <Table.Row style={{ borderBottom: 0 }}>
          <Table.TextCell flexBasis={135} flexShrink={0} flexGrow={0}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <input
                type="checkbox"
                style={{
                  height: 15,
                  background: '#EEEEEE',
                  margin: '0 13px 0 0',
                }}
              />
              <Label>Minor age child 2</Label>
            </div>
          </Table.TextCell>
          <Table.TextCell>
            <Text>2,345.67</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>345.67</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>12,345.67</Text>
          </Table.TextCell>
        </Table.Row>
        <Table.Row style={{ borderBottom: 0 }}>
          <Table.TextCell flexBasis={135} flexShrink={0} flexGrow={0}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <input
                type="checkbox"
                style={{
                  height: 15,
                  background: '#EEEEEE',
                  margin: '0 13px 0 0',
                }}
              />
              <Label>Minor age child 3</Label>
            </div>
          </Table.TextCell>
          <Table.TextCell>
            <Text>2,345.67</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>345.67</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>12,345.67</Text>
          </Table.TextCell>
        </Table.Row>
        <Table.Row>
          <Table.TextCell flexBasis={135} flexShrink={0} flexGrow={0}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <input
                type="checkbox"
                style={{
                  height: 15,
                  background: '#EEEEEE',
                  margin: '0 13px 0 0',
                }}
              />
              <Label>Adult dependent 1</Label>
            </div>
          </Table.TextCell>
          <Table.TextCell>
            <Text>2,345.67</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>345.67</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>12,345.67</Text>
          </Table.TextCell>
        </Table.Row>
        <Table.Row style={{ borderBottom: 0 }}>
          <Table.TextCell flexBasis={130} flexShrink={0} flexGrow={0}>
            <Text>Total </Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>2,345.67</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>345.67</Text>
          </Table.TextCell>
          <Table.TextCell>
            <Text>12,345.67</Text>
          </Table.TextCell>
        </Table.Row>
      </Table.Body>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Link as={'/'} href="/security_questions/">
          <ContinueButton style={{ color: '#000000' }}>Cancel</ContinueButton>
        </Link>
        <Link as={'/'} href="/security_questions/">
          <ContinueButton>Next</ContinueButton>
        </Link>
      </div>

      <CalcText>Calculations</CalcText>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Text>Prepay required from you</Text>
        <Text>123,45.06</Text>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Text>50% buffer from POEM</Text>
          <Text>(no credit check promotion)</Text>
        </div>
        <Text>123,45.06</Text>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Text>Assured payments to providers</Text>
          <Text>*Subject to terms and conditions</Text>
        </div>
        <Text>123,45.06</Text>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Text>Payment protection insurance premium</Text>
        <Text>123,45.06</Text>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Link as={'/'} href="/security_questions/">
          <ContinueButton style={{ color: '#000000' }}>Skip</ContinueButton>
        </Link>
        <Link as={'/'} href="/security_questions/">
          <ContinueButton>Next</ContinueButton>
        </Link>
      </div>
    </Layout>
  )
}

export default Participants
