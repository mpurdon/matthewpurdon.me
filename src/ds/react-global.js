/* The design-system bundle (bundle.js) is a classic IIFE script that expects a
   global `React`. This module must be imported before it. */
import React from 'react';

if (typeof window === 'undefined') {
  global.window = global;
}

window.React = React;
