import React from 'react';
import Link from 'next/link';
import Header from '../src/components/header';

export default () => (
    <div>
        <Header />

        <nav>
            <h1>Awale</h1>
            <ul>
                <li><Link href="/game"><a>Solo</a></Link></li>
                <li><Link href="/game"><a>With a friend</a></Link></li>
            </ul>
        </nav>
        <style jsx>{`
          nav {
              display: flex;
              flex-direction: column;
              font-size: 60px;
              height: 100%;
              justify-content: center;
              text-align: center;
              width: 100%;
          }
          nav h1 {
              color: #ecf0f1;
              font-weight: 200;
              margin-bottom: 30px;
          }
          nav ul {
              list-style-type: none;
              padding: 0;
          }
          nav li a {
              text-decoration: none;
              color: #138a72;
          }
          nav li a:hover{
            color: white;
          }
        `}</style>
    </div>
);
