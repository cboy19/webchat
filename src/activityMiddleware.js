export default function() {
  return  () => next => card => {
        return children => (
          <div
            className={card.activity.from.role === 'user' ? 'highlightedActivity--user' : 'highlightedActivity--bot'}
          >
            {next(card)(children)}
          </div>
        );
      };



}