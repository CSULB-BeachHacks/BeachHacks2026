import React, { useEffect, useRef, useState, forwardRef } from "react";

const LazyImage = forwardRef(function LazyImage(
  { src, alt, className, style, ...rest },
  forwardedRef,
) {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" },
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <img
      ref={(node) => {
        imgRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      }}
      src={isVisible ? src : undefined}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
});

export default LazyImage;
