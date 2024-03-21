interface IErrorProps {
  message: string
}

export default function Error<IErrorProps>({ message }) {
  return (
    <div className="error">
      <p>Error: {message}</p>
    </div>
  )
}
