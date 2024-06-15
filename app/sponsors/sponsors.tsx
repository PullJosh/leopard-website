import type { StaticImageData } from "next/image";

import BXCodingCover from "../../public/sponsors/bxcoding/bxcoding-cover.jpeg";

interface Sponsor {
  name: string;
  url: string;
  logo: React.ReactNode;
  cover: StaticImageData;
  description: React.ReactNode;
  supportDescription?: React.ReactNode;
}

export const sponsors: Sponsor[] = [
  {
    name: "BX Coding",
    url: "https://bxcoding.org/",
    logo: (
      <svg
        className="h-auto w-full fill-current"
        width="100%"
        height="100%"
        viewBox="0 0 154 154"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit={2}
      >
        <g transform="matrix(1,0,0,1,-7,-6)">
          <path d="M161,49.559C161,25.518 141.482,6 117.441,6L50.559,6C26.518,6 7,25.518 7,49.559L7,116.441C7,140.482 26.518,160 50.559,160L117.441,160C141.482,160 161,140.482 161,116.441L161,49.559ZM147,47.22C147,31.515 134.249,18.764 118.544,18.764L48.22,18.764C32.515,18.764 19.764,31.515 19.764,47.22L19.764,117.544C19.764,133.249 32.515,146 48.22,146L118.544,146C134.249,146 147,133.249 147,117.544L147,47.22Z" />
          <path d="M89.491,78.5L104.819,100.882L89.33,123.5L85.182,123.5C82.046,123.5 79.5,126.046 79.5,129.182L79.5,131.818C79.5,134.954 82.046,137.5 85.182,137.5L105.818,137.5C108.954,137.5 111.5,134.954 111.5,131.818L111.5,129.182C111.5,126.169 109.149,123.7 106.183,123.512L113.25,113.193L120.308,123.5L120.182,123.5C117.046,123.5 114.5,126.046 114.5,129.182L114.5,131.818C114.5,134.954 117.046,137.5 120.182,137.5L148.318,137.5C151.454,137.5 154,134.954 154,131.818L154,129.182C154,126.046 151.454,123.5 148.318,123.5L137.17,123.5L121.681,100.882L137.009,78.5L150.818,78.5C153.954,78.5 156.5,75.954 156.5,72.818L156.5,70.182C156.5,67.046 153.954,64.5 150.818,64.5L120.182,64.5C117.046,64.5 114.5,67.046 114.5,70.182L114.5,72.818C114.5,75.942 117.027,78.481 120.147,78.5L113.25,88.571L106.337,78.477C109.23,78.214 111.5,75.779 111.5,72.818L111.5,70.182C111.5,67.046 108.954,64.5 105.818,64.5L85.182,64.5C82.046,64.5 79.5,67.046 79.5,70.182L79.5,72.818C79.5,75.954 82.046,78.5 85.182,78.5L89.491,78.5Z" />
          <path d="M57,30.099C67.1,31.103 75,39.636 75,50C75,55.51 72.767,60.503 69.156,64.123C74.516,68.035 78,74.364 78,81.5C78,93.199 68.636,102.728 57,102.994L57,103L19.764,103L19.764,90L29,90L29,44L19.764,44L19.764,30L57,30L57,30.099ZM53,89.956C58.053,89.504 62,85.667 62,81C62,76.333 58.053,72.496 53,72.044L53,72L44,72L44,90L53,90L53,89.956ZM50,43.011L50,43L44,43L44,59L50,59L50,58.989C55.015,58.77 59,55.277 59,51C59,46.723 55.015,43.23 50,43.011Z" />
        </g>
      </svg>
    ),
    cover: BXCodingCover,
    description: (
      <p>
        BX Coding educates underserved K-12 students in the STEM fields through
        outreach programs, summer camps, and the research & development of
        computer science pedagogy.
      </p>
    ),
    supportDescription: (
      <p>
        BX Coding collaborates with Leopard to design quality education tools
        and provides server infrastructure to power the Leopard website.
      </p>
    ),
  },
];
