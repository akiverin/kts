import Text from 'components/Text';
import styles from './Summary.module.scss';

const Summary = ({ children, isDesc = true }: { children: string; isDesc?: boolean }) => {
  const formatText = (text: string) => {
    const pattern = /(<b>.*?<\/b>|<a.*?<\/a>)/g;

    return text.split(pattern).map((part, index) => {
      if (!part) return null;
      if (part.startsWith('<b>') && part.endsWith('</b>')) {
        const content = part.replace(/<\/?b>/g, '');
        if (!isDesc) {
          return (
            <Text className={styles.summary__text} tag="span" key={index} weight="bold">
              {content}
            </Text>
          );
        } else {
          return (
            <Text className={styles.summary__text} tag="span" key={index}>
              {content}
            </Text>
          );
        }
      }
      if (part.startsWith('<a')) {
        const match = part.match(/<a href="(.*?)">(.*?)<\/a>/);
        if (match) {
          const [, href, content] = match;
          if (!isDesc) {
            return (
              <a key={index} href={href} className={styles.summary__link}>
                {content}
              </a>
            );
          } else {
            return (
              <Text className={styles.summary__text} tag="span" key={index}>
                {content}
              </Text>
            );
          }
        }
      }
      return (
        <Text className={styles.summary__text} tag="span" key={index}>
          {part}
        </Text>
      );
    });
  };

  return <>{formatText(children)}</>;
};

export default Summary;
