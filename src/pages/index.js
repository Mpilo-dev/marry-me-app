import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../images/xsmall_logo.png";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../components/Layout";
import Header from "../components/header/Header";
import NewBar from "../components/NewBar";
import BoyGrid from "../components/gender/Guy";
import GirlGrid from "../components/gender/Gal";
import MarryCoupleModal from "../elements/modals/MarryCoupleModal";
import ProtectedRoute from "../components/ProtectedRoute";
import { fetchMarriages } from "../redux/features/marriageSlice";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const HeaderContainer = styled.div`
  height: 15%;
  min-height: 80px;
  background: var(--white-light);
  margin-bottom: 1rem;
`;

const BodyContainer = styled.div`
  height: 85%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const BarContainer = styled.div`
  height: 20%;
  min-height: 80px;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const GridContainer = styled.div`
  flex: 1;
  display: flex;
  gap: 25px;
  box-sizing: border-box;
  overflow: hidden;
`;

const GridBackground = styled.div`
  width: 50%;
  height: 100%;
  padding: 16px;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  background: var(--white-light);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Index = () => {
  const dispatch = useDispatch();
  const [selectedBoy, setSelectedBoy] = useState(null);
  const [selectedGirl, setSelectedGirl] = useState(null);
  const [isMarryModalOpen, setIsMarryModalOpen] = useState(false);
  const { marriages } = useSelector((state) => state.marriage);

  useEffect(() => {
    dispatch(fetchMarriages());
  }, [dispatch]);

  const isPersonMarried = (personId) => {
    return marriages.some(
      (marriage) =>
        marriage.husband._id === personId || marriage.wife._id === personId
    );
  };

  const handleBoySelect = (boy) => {
    if (isPersonMarried(boy._id)) {
      return;
    }

    if (selectedBoy?._id === boy?._id) {
      setSelectedBoy(null);
    } else {
      setSelectedBoy(boy);
      if (selectedGirl) {
        setIsMarryModalOpen(true);
      }
    }
  };

  const handleGirlSelect = (girl) => {
    if (isPersonMarried(girl._id)) {
      return;
    }

    if (selectedGirl?._id === girl?._id) {
      setSelectedGirl(null);
    } else {
      setSelectedGirl(girl);
      if (selectedBoy) {
        setIsMarryModalOpen(true);
      }
    }
  };

  const onCloseMarryModal = () => {
    setIsMarryModalOpen(false);
  };

  const handleResetSelections = () => {
    setSelectedBoy(null);
    setSelectedGirl(null);
  };

  return (
    <ProtectedRoute>
      <Layout>
        <AppContainer>
          <HeaderContainer>
            <Header />
          </HeaderContainer>
          <BodyContainer>
            <BarContainer>
              <NewBar
                boy={selectedBoy}
                girl={selectedGirl}
                active={selectedBoy && selectedGirl}
              />
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
            <MarryCoupleModal
              isVisible={isMarryModalOpen}
              onClose={onCloseMarryModal}
              selectedBoy={selectedBoy}
              selectedGirl={selectedGirl}
              onReset={handleResetSelections}
            />
          </BodyContainer>
        </AppContainer>
      </Layout>
    </ProtectedRoute>
  );
};

export default Index;

export const Head = () => (
  <>
    <title>Home Page</title>
    <link rel="icon" type="image/png" href={Logo} />
  </>
);
