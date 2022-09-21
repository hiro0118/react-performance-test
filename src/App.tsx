import { Button, Card, CardContent, Container, Typography } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

function App() {
  console.log("App updated!");
  return (
    <>
      < ParentComponent1 />
      < ParentComponent2 />
    </>
  );
}

const double = (a: number) => {
  console.log(`Taking a long time for doubling ${a}...`)
  return a * 2;
}

const ParentComponent1 = () => {
  console.log("parent1 updated!");

  const [count, setCount] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  const onCountUp = () => {
    setCount(prev => prev + 1);
  }

  const onCountUp2 = () => {
    setCount2(prev => prev + 1);
  }

  const doubledCount = double(count);

  // useEffect(() => { console.log(`useEffect in parent1 detected count up after rendering: ${count}`) }, [count]);

  return (
    <Container sx={{ width: 4 / 5 }}>
      <Card raised sx={{ padding: 2, margin: 4 }}>
        <Typography variant="h4">
          Parent Component 1
        </Typography>
        <Typography>
          {`count1: ${count}, doubled (heavy): ${doubledCount}`}
        </Typography>
        <Button variant="contained" onClick={onCountUp} sx={{ my: 2 }}>
          count up 1
        </Button>
        <Typography>
          {`count2: ${count2}`}
        </Typography>
        <Grid container spacing={2} minHeight={160}>
          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <ChildA onCountUp={onCountUp2}></ChildA>
          </Grid>
          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <ChildB count={count2}></ChildB>
          </Grid>
          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <ChildC></ChildC>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

const ParentComponent2 = () => {
  console.log("parent2 updated!");

  const [count, setCount] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  const onCountUp = () => {
    setCount(prev => prev + 1);
  };

  const doubledCount = useMemo(() => {
    return double(count);
  }, [count]);

  const onCountUp2 = useCallback(() => {
    setCount2(prev => prev + 1);
  }, []);

  // useEffect(() => { console.log(`useEffect in parent2 detected count up after rendering: ${count}`) }, [count]);

  return (
    <Container sx={{ width: 4 / 5 }}>
      <Card raised sx={{ padding: 2, margin: 4 }}>
        <Typography variant="h4">
          Parent Component 2
        </Typography>
        <Typography>
          {`count1: ${count}, doubled (heavy): ${doubledCount}`}
        </Typography>
        <Button variant="contained" onClick={onCountUp} sx={{ my: 2 }}>
          count up 1
        </Button>
        <Typography>
          {`count2: ${count2}`}
        </Typography>
        <Grid container spacing={2} minHeight={160}>
          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <ChildAMemo onCountUp={onCountUp2}></ChildAMemo>
          </Grid>
          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <ChildBMemo count={count2}></ChildBMemo>
          </Grid>
          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <ChildCMemo></ChildCMemo>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}


type ChildAProps = {
  onCountUp: () => void;
}

const ChildA: FC<ChildAProps> = (props: ChildAProps) => {
  console.log("child A updated!");
  return (
    <Card raised>
      <CardContent>
        <Typography variant="h5">
          Child A
        </Typography>
        <Button variant="contained" onClick={props.onCountUp}>
          count up 2
        </Button>
      </CardContent>
    </Card>
  );
}

type ChildBProps = {
  count: number;
}

const ChildB: FC<ChildBProps> = (props: ChildBProps) => {
  console.log("child B updated!");
  return (
    <Card raised>
      <CardContent>
        <Typography variant="h5">
          Child B
        </Typography>
        <Typography>
          {`count2 from parent: ${props.count}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

const ChildC: FC = () => {
  console.log("child C updated!");
  return (
    <Card raised sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h5">
          Child C
        </Typography>
        <Typography>
          no data from parent.
        </Typography>
      </CardContent>
    </Card>
  );
}


const ChildAMemo: FC<ChildAProps> = memo((props: ChildAProps) => {
  return (
    <ChildA
      onCountUp={props.onCountUp}
    />
  )
})

const ChildBMemo: FC<ChildBProps> = memo((props: ChildBProps) => {
  return (
    <ChildB
      count={props.count}
    />
  )
})

const ChildCMemo: FC = memo(() => {
  return (
    <ChildC />
  )
})

export default App;