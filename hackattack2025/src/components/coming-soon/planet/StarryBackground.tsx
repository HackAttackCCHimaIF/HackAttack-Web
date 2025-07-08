"use client"

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Komponen untuk menampilkan latar belakang bintang yang beranimasi.
 * @param {object} props - Properti komponen.
 * @param {number} [props.count=50] - Jumlah bintang yang akan ditampilkan.
 * @param {string} [props.className] - ClassName tambahan untuk container utama.
 * @param {string} [props.starClassName='w-1 h-1 bg-white rounded-full'] - ClassName untuk setiap bintang.
 */
const StarryBackground = ({
  count = 50,
  className = '',
  starClassName = 'w-1 h-1 bg-white rounded-full',
}) => {
  // Gunakan useMemo agar posisi dan animasi bintang tidak di-generate ulang pada setiap render.
  const stars = React.useMemo(() => {
    return [...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className={starClassName}
        style={{
          // Posisi acak di dalam container
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          // Animasi opacity dan skala yang berulang
          opacity: [0.3, 1, 0.3],
          scale: [0.5, 1.2, 0.5],
        }}
        transition={{
          // Durasi dan delay acak untuk tampilan yang lebih natural
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 3,
        }}
      />
    ));
  }, [count, starClassName]); // Dependensi: generate ulang hanya jika count atau style berubah

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {stars}
    </div>
  );
};

export default StarryBackground;