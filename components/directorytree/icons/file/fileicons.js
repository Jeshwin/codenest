// fileicons.js
import React from 'react';
import TxtIcon from './txticon';
import CppIcon from './cppicon';
import HIcon from './hicon';
import DefaultIcon from './defaulticon';

const FileIcons = {
  txt: {
    icon: <TxtIcon />,
  },
  cpp: {
    icon: <CppIcon />,
  },
  h: {
    icon: <HIcon />,
  },
  hpp: {
    icon: <HIcon />,
  },
  default: {
    icon: <DefaultIcon />,
  },
  // Add more file extensions and corresponding icons/colors
};

export default FileIcons;
