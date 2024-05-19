import React, { useEffect, useRef, useState } from 'react'
import { FaKeyboard } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { PiLineVerticalBold } from "react-icons/pi";
import { message } from 'antd'



let paragraph = `Lorem iPsum dolor sit amet consectetur adipisicing elit Laborum vero nisi labore excepturi libero nihil possimus numquam eveniet aliquid dolor ipsa exercitationem assumenda tenetur magnam tempora necessitatibus sapiente placeat odit cupiditate perferendis saepe nemo fugiat quasi! Eum hic sapiente dicta incidunt fugiat numquam eveniet iusto dolor ducimus neque modi vero itaque consectetur sunt rem blanditiis tempore adipisci et ut alias Recusandae eum sequi laudantium omnis similique aliquam quis odit dolorum accusantium facilis voluptas perspiciatis Nam earum incidunt excepturi in sunt rerum voluptatibus ipsa inventore Dolore repellendus dolorem dolor voluptatibus repudiandae blanditiis nobis eaque dicta odit enim corporis tempora aliquam recusandae molestiae et alias aliquid repellat amet accusantium porro facilis sequi Nemo excepturi alias quidem id aliquid quos Deserunt saepe ipsa laudantium voluptatum qui hic Reiciendis sequi recusandae facere quaerat quae tempore possimus quas maxime a saepe nesciunt Veritatis blanditiis ut voluptatem aperiam vitae aliquid nam fuga officiis cupiditate nulla esse! Repellat blanditiis Rerum similique exercitationem rem ipsam nemo suscipit in sequi cum asperiores amet inventore adipisci nobis quisquam omnis facere veritatis accusamus laborum laboriosam Temporibus in fuga dolor ea iste maiores animi omnis nobis placeat repellendus dolorem minus laudantium ex perferendis aspernatur at assumenda nam debitis qui quo eos labore! Fuga temporibus perspiciatis sequi ut Odio vitae eum provident maxime ipsa culpa! Sed a exercitationem perferendis iure fugiat debitis culpa soluta assumenda numquam expedita ipsa molestias in officiis et veritatis dicta cum atque aliquid voluptate corporis enim! Nesciunt excepturi numquam fugit eos voluptas maiores ad perferendis ex velit autem est at Ullam molestias inventore nostrum natus consectetur pariatur deserunt necessitatibus corporis vero vitae optio! Nulla provident nihil iure accusamus corrupti rerum nam quo exercitationem veritatis Consequatur sequi illum Odio quidem labore in adipisci vitae eveniet autem accusantium perspiciatis vel officia consectetur eos ipsa dignissimos beatae asperiores ab placeat hic voluptate Explicabo aspernatur consequatur aliquam illum autem voluptatibus reiciendis hic culpa praesentium maxime natus nemo sed earum numquam Id nobis molestias ea esse accusantium iusto nemo quibusdam ad explicabo cupiditate consectetur alias Rerum repellat asperiores facere odit tempora eum distinctio totam quaerat esse aut tenetur non corrupti sed necessitatibus nobis vero voluptatibus sunt cupiditate fugit Nostrum dolor odit quis suscipit optio laudantium sunt quisquam odio Facere quo unde porro accusantium voluptates consequatur est In animi consequuntur vitae quis quia voluptate! Vel architecto tenetur rem tempore nulla maxime delectus tempora sunt fuga vitae aspernatur at aliquid dolorum doloribus nobis autem accusantium labore quod quidem dolores rerum Earum aperiam natus ullam dignissimos ipsam labore voluptatum molestiae excepturi praesentium possimus dolorum totam atque asperiores distinctio consequuntur Fugit earum optio eligendi velit in molestiae nemo minima laboriosam repellat accusantium eaque eveniet qui quisquam amet facere placeat officiis corporis saepe deleniti voluptas reprehenderit ipsam! Voluptas a in facere autem voluptatibus pariatur rerum id consectetur labore vel similique esse deserunt distinctio aspernatur nam at dolorem porro minus nulla unde consequatur nostrum Aliquid earum vel fuga recusandae eos magnam culpa officiis sunt cupiditate qui assumenda magni dicta provident architecto id consectetur eius vero sed maxime error autem eaque`


export default function Home() {
    paragraph = paragraph.toLowerCase()

    let maxTime = 60;
    const [timeLeft, setTimeLeft] = useState(maxTime)
    const [mistakes, setMistakes] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [WPM, setWPM] = useState(0)
    const [CPM, setCPM] = useState(0)
    const inputRef = useRef(null)
    const charRefs = useRef([])
    const [correctWrong, setCorrectWrong] = useState([])


    useEffect(() => {
        inputRef.current.focus()
        setCorrectWrong(Array(charRefs.current.length).fill(''))
    }, [])



    useEffect(() => {
        let interval;
        if (isTyping && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1)
                let correctChars = charIndex - mistakes
                let totalTime = maxTime - timeLeft

                let cpm = correctChars * (60 / totalTime)
                cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm
                setCPM(parseInt(cpm, 10))

                let wpm = Math.round((correctChars / 5 / totalTime) * 60)
                wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
                setWPM(wpm)

            }, 1000)
        } else if (timeLeft === 0) {
            clearInterval(interval)
            setIsTyping(false)
            message.warning('Time Over!')
        }
        return () => {
            clearInterval(interval)
        }
    }, [isTyping, timeLeft])

    const reset = () => {
        setIsTyping(false)
        setTimeLeft(maxTime)
        setCharIndex(0)
        setMistakes(0)
        setWPM(0)
        setCPM(0)
        setCorrectWrong(Array(charRefs.current.length).fill(''))
        inputRef.current.focus()
    }

    const handleChange = e => {
        const characters = charRefs.current
        let currentChar = charRefs.current[charIndex]
        let typedChar = e.target.value.slice(-1)

        if (charIndex < characters.length && timeLeft > 0) {
            if (!isTyping) {
                setIsTyping(true)
            }

            if (typedChar === currentChar.textContent) {
                setCharIndex(charIndex + 1)
                correctWrong[charIndex] = 'correct'

            } else {
                setCharIndex(charIndex + 1)
                setMistakes(mistakes + 1)
                correctWrong[charIndex] = 'wrong'
            }

            if (charIndex === characters.length - 1) setIsTyping(false)

        } else {
            setIsTyping(false)
        }
    }



    return (
        <div className='py-3 py-md-4 bg-dark' style={{ minHeight: '100vh' }}>
            <div className="header container text-center">
                <h1 className='fs-2 fw-bold text-warning'>Typing Test <FaKeyboard className='mx-1' /></h1>
                <p style={{ color: '#413F3F' }}>an elegant typing experience just start typing<PiLineVerticalBold className='animate__animated animate__flash animate__infinite infinite' /></p>
            </div>
            <div className="container w-75">
                <div className="">
                    <div className='fs-4 text-secondary my-2 mt-md-5 mb-md-3 test' style={{ lineHeight: '2em', maxHeight: '250px', overflowY: 'auto' }}>
                        <input type="text" name="" id="" ref={inputRef} onChange={handleChange} />
                        {
                            paragraph.split('').map((char, i) => {
                                return (
                                    <span key={i} className={`char me-1 ${i === charIndex ? ' border-bottom border-warning border-3' : ''} ${correctWrong[i] === 'correct' ? ' text-white' : ''} ${correctWrong[i] === 'wrong' ? ' text-danger' : ''}`} ref={e => charRefs.current[i] = e}>
                                        {char}
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>

                <p className="fw-bold fs-5 text-primary mt-4">{timeLeft} sec</p>
                <p className='fw-bold'>
                    <span className='me-2 text-primary'>WPM: {WPM}</span>
                    <span className='mx-2 text-primary' style={{ opacity: '.5' }}>Mistakes: {mistakes}</span>
                    <span className='mx-2 text-primary' style={{ opacity: '.5' }}>CPM: {CPM}</span>
                </p>
                <div className='mt-4 time_difficulty'>
                    <div className='text-center text-secondary'>
                        <span onClick={reset} className='mx-2 text-primary fs-4'><BiRefresh /></span>
                        {/* <span className='mx-2'>90</span>
                        <span className='mx-2'>60</span>
                        <span className='mx-2'>30</span> */}
                    </div>
                    {/* <div className='text-center my-1'>
                        <span className='mx-2 text-secondary'>normal</span>
                        <span className='mx-2 text-secondary'>medium</span>
                        <span className='mx-2 text-secondary'>hard</span>
                    </div> */}
                </div>
            </div>
        </div >
    )
}
