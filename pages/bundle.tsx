
import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import LoginConnect from "./../components/connect/LoginConnect";
import P1 from '../statics/add.svg'
import P2 from '../statics/delete.svg'
import P3 from '../statics/img/browser.png'
import P4 from '../statics/img/wallect1.png'

import P5 from '../statics/p5.svg'
import P6 from '../statics/p6.svg'
import P7 from '../statics/p7.svg'
import P8 from '../statics/p8.svg'
import HeadImg from '../statics/head.svg'
import { useAddressList, loginAccountState } from "../store/state";
import { Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import useWeb3Context from "../hooks/useWeb3Context";
import { useRouter } from "next/router";
import { shortenAddr } from './../lib/tool'
// const inter = Inter({ subsets: ['latin'] })
import Step from '../components/Step'

const selectTab = [{
  name: 'Hold a BABT',
  check: false,
  imgUrl: P5
}, {
  name: 'Have a primary domain',
  check: true,
  imgUrl: P6
},
{
  name: 'Hold an NFT on Ethereum mainnet',
  check: true,
  imgUrl: P7
},
{
  name: 'Hold a Lens Profile NFT',
  check: true,
  imgUrl: P8
}]

export default function Home() {
  const router = useRouter();
  const { addressList, setAddressList } = useAddressList();

  const { loginAccount, setLoginAccount } = loginAccountState();

  const [showConnect, setShowConnect] = useState(false);

  const [activeIndex, setActiveIndex] = useState<any>('');

  const { connectWallet } = useWeb3Context();

  const deleteAddress = (address: any) => {
    let filterAddrList = addressList.filter((t, i) => {
      return t !== address
    })
    setAddressList([...filterAddrList])
  }

  const connector = async (walletName: string) => {
    const res = await connectWallet(walletName);
    setShowConnect(false)
    if (res) {
      if (!addressList.includes(res)) {
        console.log([...addressList, res])
        setAddressList([...addressList, res])
        setShowConnect(false)
      }
    }
  }

  const nextStep = () => {
    router.push('/mint')
  }

  return (
    <div className="w-full h-full boundle-bg relative flex justify-between px-10 gap-20 text-[#fff] items-center">
      <div className="h-[60%] w-1/2">
        <p className="text-[30px] font-[600]">MANAGE BUNDLE</p>
        <p className="text-[#BBE7E6]">Connect one or more addresses in your Constellation Bundle. The connected</p>

        <p className="text-[#BBE7E6]"> addresses are only visibile to you.</p>
        <div className=" bg-[rgba(187,231,230,.2)] p-4 mt-10">
          <div className="flex items-center border-b-[1px] border-[rgba(255,255,255,.6)] pb-4">
            <div>Constellation Bundle</div>
            <div onClick={() => setShowConnect(true)} className="ml-[auto] bg-[rgba(217,217,217,.3)] border-solid border-[rgba(255,255,255,.6)] cursor-pointer flex items-center justify-center px-3 py-[6px] rounded-[20px]">
              <Image
                className="ml-[auto] mr-2 h-[16px] w-[16px]"
                src={P1}
                alt=""
              />
              <span className="text-[16px]">ADD</span>
            </div>
          </div>
          <div>
            {
              addressList.map((t, i) => (
                <div className={`flex items-center my-4 hover:bg-[rgba(187,231,230,.3)] py-2 px-4 cursor-pointer ${i === activeIndex ? 'bg-[rgba(187,231,230,.3)]' : ''}`} key={i} onClick={() => setActiveIndex(i)}>
                  <div className="flex items-center">
                    <Image
                      className="ml-[auto] mr-5"
                      src={HeadImg}
                      alt=""
                    />
                    <span>{t}</span>
                  </div>
                  <div className="ml-[auto]">
                    <Image
                      className="ml-[auto] h-6 w-6 cursor-pointer"
                      onClick={() => deleteAddress(t)}
                      src={P2}
                      alt=""
                    />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="h-[100%] w-1/2 flex items-center justify-center">
        <div className="h-[60%] w-full">
          <p className="text-[#BBE7E6] text-[24px] mb-6">Get a Crux SBT</p>
          <div className=" border-solid border-[1px] border-[rgba(255,255,255,0.7)] p-8 px-20">
            <p className="text-[#BBE7E6] text-[24px] mb-6">Meet all below conditions</p>
            <div>
              {
                selectTab.map((t, i) => (
                  <div className="flex items-center mb-6" key={i}>
                    <div className="w-[30px] h-[30px]">
                      <Image
                        className="ml-[auto] h-8 w-8 cursor-pointer"
                        src={t.imgUrl}
                        alt=""
                      />
                    </div>
                    <div className="px-4 ml-2 text-[#fff] text-[20px]">{t.name}</div>
                    <div className="w-[26px] h-[26px] bg-[#BBE7E6] flex items-center justify-center rounded-[50%] ml-[auto]">
                      <CloseOutlined style={{ color: '#000' }} className="text-[#000]" />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <button onClick={() => nextStep()} className="float-right ml-[auto] mt-[20px] bg-[rgba(217,217,217,0.2)] px-3 py-1 cursor-pointer text-[20px] border-solid border-[1px] border-[rgba(255,255,255,0.4)]">Continue</button>
        </div>
      </div>

      {/* {showConnect && (
        <LoginConnect
          onCancel={() => setShowConnect(false)}
          onConnect={() => {
            setShowConnect(true);
          }}
        />
      )} */}

      {
        showConnect &&
        <div className="w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] top-0 left-0 absolute">
          <div className="w-[400px] text-[#fff] h-[400px] bg-[rgba(28,31,41,1)] text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[20px] flex items-center justify-center">
            <div onClick={() => setShowConnect(false)} className="ml-[auto] absolute right-[10px] top-[10px] rounded-[4px] bg-[rgba(255,255,255,0.5)] flex items-center justify-center h-8 w-8 cursor-pointer"><CloseOutlined /></div>
            <div className="w-[80%]">
              <div className="text-[16px] text-[rgba(255,255,255,0.8)]">
                <div className="text-[#EEFBFF] text-[20px] mb-5">Connect your wallet.</div>
                <div className="text-[#6C747D] text-[14px] mb-3">Connect with one of available wallet providers or create a new one.</div>
                <div className="mt-4">
                  <div onClick={() => connector('injected')} className="flex items-center border-[1px] border-[#4A4A4A] px-[10px] py-[8px] font-[600] rounded-[4px] mb-[10px] cursor-pointer">
                    <span>Browser Wallet</span>
                    <Image
                      className="ml-[auto]"
                      src={P3}
                      alt=""
                    />
                  </div>
                  <div onClick={() => connector('walletconnect')} className="flex items-center border-[1px] border-[#4A4A4A] px-[10px] py-[8px] font-[600] rounded-[4px] cursor-pointer">
                    <span>WalletConnect</span>
                    <Image
                      className="ml-[auto]"
                      src={P4}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

<div className="absolute bottom-[10%] left-[50%] translate-x-[-50%] w-full flex items-center justify-center">
        <Step num={2} />
      </div>
    </div>
  )
}
