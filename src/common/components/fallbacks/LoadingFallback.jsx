import loadingGif from '../../../assets/1200x1200.gif';

export default function LoadingFallback() {
  return (
    <img
      style={{
        height: '100%',
        margin: '0 auto',
        position: 'absolute',
        alignSelf: 'center',
      }}
      src={loadingGif}
      alt="loading..."
    />
  );
}
