import { useSound } from 'react-sounds';

function Button() {
  const { play } = useSound('notification/notification');
  
  return (
    <button onClick={() => play()}>
      Click Me
    </button>
  );
}

export default Button