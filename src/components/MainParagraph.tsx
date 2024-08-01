function MainParagraph({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  return (
    <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-200 text-center max-w-3xl mb-12 mx-auto">
      {text} {highlight && <span className="text-indigo-600">{highlight}</span>}
    </p>
  );
}

export default MainParagraph;
