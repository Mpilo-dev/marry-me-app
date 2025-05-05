import React, { useState } from "react";
import styled from "styled-components";

import Layout from "../components/Layout";
import Header from "../components/header/Header";
import NewBar from "../components/NewBar";
import BoyGrid from "../components/gender/Guy";
import GirlGrid from "../components/gender/Gal";
import DivorceModal from "../elements/modals/divorceModal";
import PrimaryButton from "../elements/buttons/PrimaryButton";
import SignUp from "./SignUp";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const HeaderContainer = styled.div`
  height: 15%;
  background: var(--white-light);
  margin-bottom: 1rem;
`;

const BodyContainer = styled.div`
  height: 85%;
  padding: 0 2rem;
`;
const BarContainer = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 25px;
  box-sizing: border-box;
  overflow: hidden;
`;

const GridBackground = styled.div`
  width: 50%;
  height: 100%;
  padding: 16px;
  background: lightgray;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  background: var(--white-light);
`;

const GenderContainer = styled.div`
  height: 85%;
`;

const Button = styled.div`
  height: 15%;
`;

const IndexPage = () => {
  const [selectedBoy, setSelectedBoy] = useState(undefined);
  const [selectedGirl, setSelectedGirl] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBoySelect = (boy) => {
    if (selectedBoy === boy) {
      setSelectedBoy(undefined);
    } else {
      if (selectedGirl) {
        setSelectedBoy(boy);
        setIsModalOpen(true);
      } else {
        setSelectedBoy(boy);
      }
    }
  };

  const handleGirlSelect = (girl) => {
    if (selectedGirl === girl) {
      setSelectedGirl(undefined);
    } else {
      if (selectedBoy) {
        setSelectedGirl(girl);
        setIsModalOpen(true);
      } else {
        setSelectedGirl(girl);
      }
    }
  };

  const isActive = selectedBoy !== undefined && selectedGirl !== undefined;
  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <AppContainer>
        <Header />
        <BodyContainer>
          <BarContainer>
            <NewBar boy={selectedBoy} girl={selectedGirl} active={isActive} />
          </BarContainer>
          <GridContainer>
            <GridBackground>
              <BoyGrid
                selectedBoy={selectedBoy}
                onSelectBoy={handleBoySelect}
              />
            </GridBackground>
            <GridBackground>
              <GirlGrid
                selectedGirl={selectedGirl}
                onSelectGirl={handleGirlSelect}
              />
            </GridBackground>
          </GridContainer>
          <DivorceModal
            isVisible={selectedBoy && selectedGirl && isModalOpen}
            onClick={onClose}
          />
        </BodyContainer>
      </AppContainer>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
