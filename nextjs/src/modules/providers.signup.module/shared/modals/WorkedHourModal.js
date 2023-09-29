import Modal from '../../../../components/Modal'
import styled from 'styled-components'
import Image from 'next/image'

import { useEffect, useState } from 'react'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: #F0F2F5;
    border-radius: 12px;
    width: 627px;
    height: 374px;
    position: absolute;
    top: calc(50% - 187px);
    left: calc(50% - 314px);
    padding: 10px;
`
const MainContainer = styled.div`
    height: 220px;
    overflow-y: auto;
    & ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    & ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    }
    & ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
    }
    & ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
    }
    & ::-webkit-scrollbar-thumb:active {
    background: rgba(0, 0, 0, 0.9);
    }
`
const Panel = styled.table`
    border-collapse: collapse;
    width: 100%;
`
const Row = styled.tr`
    border-bottom: 1px solid #999;
`
const Col = styled.td`
    padding-top: 8px;
    padding-bottom: 8px;
`
const Label = styled.label`
    font-family: SF Pro Text;
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: center;
`
const DayLabel = styled.div`
    font-family: SF Pro Text;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: center;
`
const TimeBox = styled.div`
    border: 1px solid #999;
    border-radius: 5px;
    display: flex;
    color: #000;
    padding: 10px;
    justify-content: space-between;
`
const TimeInput = styled.input`
    background-color: transparent;
    font-family: SF Pro Text;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    text-align: left;
    outline: none;
    border-width: 0;
    width: 20px;
    padding: 0;
`
const LinkButton = styled.p`
    font-family: SF Pro Text;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #173fd4;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    margin: 0;
`

function WorkedHourModal({
    isOpen,
    onCancel,
    onSave,
    data
}) {
    const [workedHourList, setWorkedHourList] = useState([])
    const [showedSave, setShowedSave] = useState(false)
    const [usedDays, setUsedDays] = useState({ mon: false, tue: false, wed: false, thi: false, fri: false, sat: false, sun: false })
    const dayLabels = {mon: 'M', tue: 'Tu', wed: 'W', thi: 'Th', fri: 'F', sat: 'Sa', sun: 'S'}

    function getNewOne() {
        return {
            id: 0,
            presentDays: {
                mon: false,
                tue: false,
                wed: false,
                thi: false,
                fri: false,
                sat: false,
                sun: false
            },
            startTime: '00:00',
            endTime: '00:00',
            hoursWorked: 0
        }
    }

    useEffect(() => {
        if (!isOpen)
            return
        console.log('init')
        if (data.length == 0) {
            initData()
            //setShowedSave(true)
        } 
        else {
            data.forEach((v1, k1) => {
                if (v1 !== undefined)
                {
                    Object.keys(usedDays).forEach((v2, k2) => {
                        if (v1.presentDays[v2])
                            usedDays[v2] = true
                    })
                }
            })

            setWorkedHourList([...data])
            setUsedDays(Object.assign({}, usedDays))
            //setShowedSave(false)
        }
        
    }, [isOpen])

    function addAnother() {
        workedHourList.push(getNewOne())

        setWorkedHourList([...workedHourList])

        //setShowedSave(true)
    }

    function remove(idx) {
        let workedHour = workedHourList[idx]
        if (workedHour.id == 0) {
            let new_ = workedHourList.filter((v, i) => i != idx)
            if (new_.length == 0) {
                new_.push(getNewOne())
            }
            setWorkedHourList([...new_])
        }
        else {

        }
        
    }

    // function update(idx) {
    // }

    function initData() {
        setWorkedHourList([getNewOne()])
        setUsedDays({ mon: false, tue: false, wed: false, thi: false, fri: false, sat: false, sun: false })
    }

    function save() {
        initData()
        isOpen = false
        //setShowedSave(false)
        onSave(workedHourList)
    }

    function calcWorkedHours(idx) {
        let data = workedHourList[idx]

        let checkedCount = 0
        Object.keys(data.presentDays).forEach((v, i) => {
            if (data.presentDays[v]) {
                checkedCount++
            }                
        })

        let arr1 = data.startTime.split(':')
        let arr2 = data.endTime.split(':')

        let t1 = parseInt(arr1[0], 10) + parseInt(arr1[1], 10) / 60
        let t2 = parseInt(arr2[0], 10) + parseInt(arr2[1], 10) / 60

        workedHourList[idx].hoursWorked = (t2 - t1) * checkedCount
    }

    function time2str(t) {
        let h = Math.floor(t)
        let m = Math.round((t - h) * 60)
        let s = new String(h).padStart(2, 0) + ':' + new String(m).padStart(2, 0)
        return s
    }

    function totalWorkedHours() {
        let sum = 0
        workedHourList.forEach((v, i) => {
            sum += v.hoursWorked
        })

        return time2str(sum)
    }

    return (
        <>
        <Modal isOpened={isOpen}>
            <Wrapper>
                <div style={{display: 'flex', marginTop: 15, marginBottom: 15}}>
                    <div style={{width: '40%', textAlign: 'center'}}><Label>Days of week</Label></div>
                    <div style={{width: '15%', textAlign: 'center'}}><Label>Start time</Label></div>
                    <div style={{width: '15%', textAlign: 'center'}}><Label>End time</Label></div>
                    <div style={{width: '20%', textAlign: 'center'}}><Label>Hours worked</Label></div>
                    <div style={{width: '10%', textAlign: 'center'}}></div>
                </div>
                <MainContainer>
                <Panel>
                <tbody>
                    {(workedHourList.map((d, i) => (
                    <Row key={i}>
                        <Col style={{width: '40%'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            {Object.keys(dayLabels).map((v, k) => (
                            <div key={k}>
                                <DayLabel>{dayLabels[v]}</DayLabel>
                                <input type="checkbox" checked={d.presentDays[v]}
                                onChange={(e) => {
                                    if (d.presentDays[v])
                                    {
                                        workedHourList[i].presentDays[v] = false
                                        usedDays[v] = false
                                        calcWorkedHours(i)
                                        setWorkedHourList([...workedHourList])
                                        setUsedDays(Object.assign({}, usedDays))
                                    }
                                    else {
                                        if (usedDays[v]) {
                                            console.log('prevent:', v)
                                            e.target.checked = false
                                            e.preventDefault()
                                            return
                                        }
                                        else {
                                            usedDays[v] = true
                                            workedHourList[i].presentDays[v] = true
                                            calcWorkedHours(i)
                                            setWorkedHourList([...workedHourList])
                                            setUsedDays(Object.assign({}, usedDays))
                                        }   
                                    }
                                }} />
                            </div>   
                            ))}
                        </div>
                        </Col>
                        <Col style={{width: '15%'}}>
                            <TimeBox>
                                <TimeInput type={'text'} value={d.startTime.split(':')[0]} maxLength={2} placeholder="00"
                                onChange={(e) => {
                                    let arr = d.startTime.split(':')
                                    if (isNaN(e.target.value)) {
                                        workedHourList[i].startTime = '00:' + arr[1]
                                    }
                                    else {
                                        workedHourList[i].startTime = new String(e.target.value).padStart(0, 2) + ':' + arr[1]                                        
                                    }

                                    calcWorkedHours(i)
                                    setWorkedHourList([...workedHourList])
                                }} /> 
                                <Label>:</Label>
                                <TimeInput type={'text'} value={d.startTime.split(':')[1]} maxLength={2} placeholder="00"
                                onChange={(e) => {
                                    let arr = d.startTime.split(':')
                                    if (isNaN(e.target.value)) {
                                        workedHourList[i].startTime = arr[0] + ':00'                                        
                                    }
                                    else {
                                        workedHourList[i].startTime = arr[0] + ':' + new String(e.target.value).padStart(0, 2)
                                    }

                                    calcWorkedHours(i)
                                    setWorkedHourList([...workedHourList])
                                }} /> 
                            </TimeBox>
                        </Col>
                        <Col style={{width: '15%'}}>
                            <TimeBox>
                                <TimeInput type={'text'} maxLength={2} placeholder="00"
                                value={d.endTime.split(':')[0]}
                                onChange={(e) => {
                                    let arr = d.endTime.split(':')                                        
                                    if (isNaN(e.target.value))
                                    {
                                        workedHourList[i].endTime = '00:' + arr[1]
                                    }
                                    else {
                                        workedHourList[i].endTime = new String(e.target.value).padStart(0, 2) + ':' + arr[1]
                                    }

                                    calcWorkedHours(i)
                                    setWorkedHourList([...workedHourList])
                                }} /> 
                                <Label>:</Label>
                                <TimeInput type={'text'} maxLength={2} placeholder="00"
                                value={d.endTime.split(':')[1]}
                                onChange={(e) => {
                                    let arr = d.endTime.split(':')                                        
                                    if (isNaN(e.target.value)) {
                                        workedHourList[i].endTime = arr[0] + ':00'
                                    }
                                    else {
                                        workedHourList[i].endTime = arr[0] + ':' + new String(e.target.value).padStart(0, 2)
                                    }

                                    calcWorkedHours(i)
                                    setWorkedHourList([...workedHourList])
                                }} /> 
                            </TimeBox>
                        </Col>
                        <Col style={{width: '20%', textAlign: 'center'}}><Label>{time2str(d.hoursWorked)}</Label></Col>
                        <Col style={{width: '10%'}}>
                            {/* {(d.id > 0)&& (
                            <>
                            <ImgButton onClick={() => {update(i)}} style={{marginRight: 20}} src={require('../../../public/assets/images/ico-edit1.png')}/>
                            </>
                            )} */}
                            <Image style={{ cursor: 'pointer' }} onClick={() => {remove(i)}} src="/assets/images/ico-delete1.png" width="15" height="15" />
                        </Col>
                    </Row>  
                    )))}
                                     
                </tbody>
                </Panel>
                </MainContainer>
                <div style={{display: 'flex', marginTop: 15}}>
                    <div style={{width: '40%', textAlign: 'center'}}><Label>Total hours worked</Label></div>
                    <div style={{width: '60%', textAlign: 'center'}}><Label>{totalWorkedHours()}</Label></div>
                </div>
                <div style={{display: 'flex', marginTop: 10}}>
                    <LinkButton onClick={addAnother}>Add another</LinkButton>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 10}}>
                    <LinkButton onClick={() => {
                        initData()
                        isOpen = false
                        onCancel()
                    }} style={{marginRight: 20, color: '#333'}}>Cancel</LinkButton>
                    <LinkButton onClick={save}>Save</LinkButton>
                </div>
            </Wrapper>
        </Modal>
        </>
    )
}

export default WorkedHourModal