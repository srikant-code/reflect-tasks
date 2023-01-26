import React, { useRef, useEffect } from "react";

const UnderwaterParallax = () => {
  const foregroundRef = useRef(null);
  const backgroundRef = useRef(null);
  const fishRef = useRef(null);
  const submarineRef = useRef(null);
  const bubbleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const foreground = foregroundRef.current;
      const background = backgroundRef.current;
      const fish = fishRef.current;
      const submarine = submarineRef.current;
      const bubble = bubbleRef.current;

      const scrollY = window.scrollY;

      foreground.style.transform = `translateY(${scrollY * 0.5}px)`;
      background.style.transform = `translateY(${scrollY * 0.25}px)`;
      fish.style.transform = `translateY(${-scrollY * 0.5}px)`;
      submarine.style.transform = `translateY(${scrollY * 0.75}px)`;
      bubble.style.transform = `translateY(${-scrollY * 0.25}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div ref={foregroundRef} className="foreground">
        Foreground
      </div>
      <div ref={backgroundRef} className="background">
        Background
      </div>
      <div ref={fishRef} className="fish">
        Fish
      </div>
      <div ref={submarineRef} className="submarine">
        Submarine
      </div>
      <div ref={bubbleRef} className="bubble">
        Bubble
      </div>
    </div>
  );
};

export default UnderwaterParallax;

// In this example, the foreground and background elements are animated using the transform property and the translateY function. The amount of translation is based on the scroll position of the window, which is obtained using window.scrollY. The useEffect hook is used to add an event listener for the scroll event, and the useRef hooks are used to get references to the foreground and background elements.

// You can customize the animation by changing the values of the translateY function and the scrollY variable. You can also add additional elements and animate them in the same way.

// To add fish, a submarine, and bubbles to your underwater parallax animation, you can create additional elements and animate them using the same technique as the foreground and background elements.

// In this example, the fish and bubble elements are moving in the opposite direction of the scroll, so their translateY values are negated. The submarine element is moving faster than the other elements, so its translateY value is multiplied by a larger number.

// You can customize the animation by changing the values of the translateY function and the scrollY variable for each element. You can also add additional elements and animate them in the same way.
