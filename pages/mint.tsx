
import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import LoginConnect from "./../components/connect/LoginConnect";
import P1 from '../statics/add.svg'
import P2 from '../statics/delete.svg'
import HeadImg from '../statics/head.svg'
import { loginAccountState } from "../store/state";
import { Checkbox } from 'antd';
import { shortenAddr } from './../lib/tool'
import Step from '../components/Step'

export default function Home() {

  const [showMintModal, setShowMintModal] = useState(false);

  const { loginAccount, setLoginAccount } = loginAccountState();

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full boundle-bg relative flex justify-between px-10 gap-20 text-[#fff] items-center">
        <div className="w-1/2">
          <p className="text-[30px] font-[600]">SELECT YOUR STARKNET ADDRESS</p>
          <p className="text-[#BBE7E6]">Once the Constellation SBT has been minted, it can not be transferred.</p>
          <div className=" bg-[rgba(187,231,230,.2)] p-4 mt-10">
            <div className="flex items-center">
              <Image
                className="mr-5"
                src={HeadImg}
                alt=""
              />
              <span>{shortenAddr(loginAccount)}</span>
            </div>
          </div>
        </div>
        <div className="h-[50%] w-1/2 border-solid border-[1px] border-[rgba(255,255,255,0.7)] p-8 px-20">
          <p className="text-[#fff] text-[24px] mb-6">MINT YOUR CRUX </p>
          <div className="flex items-center justify-center w-full h-[calc(100%-80px)]">
            <p className="text-[#BBE7E6] text-[16px] mb-6">Remember once you mint your Crux, the addresses in your
              bundle are locked to this Crux and can’t be added to any other
              Constellation bundle. </p>
          </div>
        </div>
        <button onClick={() => setShowMintModal(true)} className="absolute right-10 bottom-[10%] bg-[rgba(217,217,217,0.2)] px-3 py-1 cursor-pointer text-[20px] border-solid border-[1px] border-[rgba(255,255,255,0.4)]">Mint</button>

      </div>
      {
        showMintModal &&
        <div className="w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] top-0 left-0 absolute">
          <div className="w-[600px] text-[#fff] h-[600px] bg-[rgba(28,31,41,1)] text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[20px] flex items-center justify-center">
            <div className="w-[80%]">
              <p className="text-[30px] mb-10">CONFIRM CRUX MINT</p>
              <p className="text-[18px] mb-[30px] text-[#BBE7E6]">CRUX ADDRESS</p>
              <p className="text-[16px] mb-10">The CRUX will be mint to the following address:</p>
              <div>
                <div className="flex items-center mx-[auto] w-[fit-content] mb-10">
                  <Image
                    className="mr-5"
                    src={HeadImg}
                    alt=""
                  />
                  <span>{shortenAddr(loginAccount)}</span>
                </div>
              </div>
              <p className="text-[18px] mb-[30px] text-[#BBE7E6]">BUNDLE</p>
              <p>You have 2 bundled addresses for 4 attestations  </p>
              <div className="w-[60%] mx-[auto] flex items-center mt-20">
                <button className=" h-[40px] w-[120px] flex items-center justify-center text-[#000] bg-[#fff] rounded-[12px]" onClick={() => setShowMintModal(false)}>
                  Cancel
                </button>
                <button className="ml-[auto] h-[40px] w-[120px] flex items-center justify-center bg-[#000] rounded-[12px]">
                  Mint
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <div className="absolute bottom-[10%] w-full flex items-center justify-center">
        <Step num={3} />
      </div>
    </div>
  )
}
