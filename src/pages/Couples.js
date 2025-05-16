import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import ArrowLeftIcon from "../images/icons/arrow-left.svg";
import NewBar from "../components/NewBar";
import SecondaryButton from "../elements/buttons/SecondaryButton";
import DivorceModal from "../elements/modals/divorceModal";
import ProtectedRoute from "../components/ProtectedRoute";

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
  height: 80%;
  padding: 0 2rem;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopSection = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
  position: relative;
  z-index: 1;
  gap: 1rem;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: var(--black);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;

  &:hover {
    color: var(--purple);
  }
`;

const BackgroundContainer = styled.div`
  flex: 1;
  height: 100%;
  background: var(--white-light);
  border-radius: 1rem;
  z-index: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`;

const BackIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Couples = () => {
  const dispatch = useDispatch();
  const { marriages } = useSelector((state) => state.marriage);
  const [selectedMarriage, setSelectedMarriage] = useState(null);
  const [isDivorceModalOpen, setIsDivorceModalOpen] = useState(false);

  const handleBack = () => {
    navigate("/indexPage");
  };

  const handleDivorceClick = (marriage) => {
    console.log("Opening divorce modal for marriage:", marriage);
    setSelectedMarriage(marriage);
    setIsDivorceModalOpen(true);
  };

  const handleCloseDivorceModal = () => {
    console.log("Closing divorce modal");
    setSelectedMarriage(null);
    setIsDivorceModalOpen(false);
  };

  return (
    <ProtectedRoute>
      <Layout>
        <AppContainer>
          <HeaderContainer>
            <Header />
          </HeaderContainer>
          <BodyContainer>
            <ContentWrapper>
              <TopSection>
                <BackButton onClick={handleBack}>
                  <BackIcon src={ArrowLeftIcon} alt="Back" />
                  Back
                </BackButton>
                <BackgroundContainer>
                  {marriages.map((marriage) => (
                    <BarContainer key={marriage._id}>
                      <NewBar
                        boy={marriage.husband}
                        girl={marriage.wife}
                        active={true}
                      />
                      <SecondaryButton
                        text="Divorce Couple"
                        border="none"
                        onClick={() => handleDivorceClick(marriage)}
                        type="button"
                      />
                    </BarContainer>
                  ))}
                </BackgroundContainer>
              </TopSection>
            </ContentWrapper>
          </BodyContainer>
        </AppContainer>
        <DivorceModal
          isVisible={isDivorceModalOpen}
          onClose={handleCloseDivorceModal}
          marriage={selectedMarriage}
        />
      </Layout>
    </ProtectedRoute>
  );
};

export default Couples;

export const Head = () => <title>Couples Page</title>;
