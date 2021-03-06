import React from 'react';
import styled from 'styled-components';
import GraphComponent from 'components/graph';
import MainComponent from 'components/main';
import RankingComponent from 'components/ranking';
import LoginComponent from 'components/login';
import {
  getUserName,
  setUserName as setUserNameAtLocal,
} from 'lib/localStorage';
import { getCount, getRanking, updateDate } from 'lib/firebase/function';
import Button from '@material-ui/core/Button';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
const Component: React.FC = (props) => {
  const [userName, setUserName] = React.useState(getUserName());
  const [count, setCount] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(!!!userName.length);
  const [ranking, setRanking] = React.useState([]);
  React.useEffect(
    () => {
      getCount(userName, setCount);
    },
    [userName]
  );

  React.useEffect(() => {
    getRanking((nextList) => {
      nextList.sort((a, b) => {
        return b.count - a.count;
      });
      setRanking(nextList);
    });
    updateDate();
  }, []);

  function tryLogin(isCancel: boolean) {
    return function (next?: string) {
      if (isCancel) {
        setIsOpen(!!!userName.length);
        return;
      }

      setUserNameAtLocal(next);
      setUserName(next);
      setIsOpen(!!!next.length);
    };
  }
  function loginOpen() {
    setIsOpen(true);
  }

  return (
    <div {...props}>
      <div className="main">
        <MainComponent user_name={userName} count={count} />
        <RankingComponent ranking={ranking} />
        <GraphComponent user_name={userName} />
      </div>
      {isOpen && (
        <LoginComponent
          userName={userName}
          submit={tryLogin(false)}
          cancel={tryLogin(true)}
        />
      )}
      <Button
        variant="contained"
        startIcon={<AccountBoxIcon />}
        onClick={loginOpen}
      >
        <div>{userName}</div>
      </Button>
    </div>
  );
};

const Style = styled(Component)`
  & > .main {
    display: flex;
    flex-wrap: wrap;
    min-height: 100vh;
    height: 100%;
  }

  & > button {
    position: fixed;
    top: 1rem;
    right: 1rem;
    & > div {
      &:last-child {
        display: none;
      }
    }
    &:hover {
      & > div {
        &:last-child {
          display: none;
        }
        &:first-child {
          display: block;
        }
      }
    }
  }
`;
export default Style;
