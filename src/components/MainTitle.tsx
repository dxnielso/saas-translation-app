function MainTitle({ text }: { text: string }) {
  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-8 max-w-xl text-center mx-auto">
      {text}
    </h1>
  );
}

export default MainTitle;
